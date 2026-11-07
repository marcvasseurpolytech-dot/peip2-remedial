import json, urllib.request, sys
from playwright.sync_api import sync_playwright

BASE = 'http://localhost:8765/'
GH = 'http://127.0.0.1:9101'
errors = []

def dump():
    return json.load(urllib.request.urlopen(GH + '/__dump'))
def ctl(**kw):
    req = urllib.request.Request(GH + '/__ctl', data=json.dumps(kw).encode(), method='POST'); urllib.request.urlopen(req).read()

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    ctx = b.new_context(viewport={'width': 1100, 'height': 900})
    ctx.add_init_script("try{ if(location.pathname.indexOf('admin')<0) localStorage.setItem('peip2.lang','fr'); }catch(e){}")
    page = ctx.new_page()
    page.on('console', lambda m: errors.append(('console', m.text)) if m.type == 'error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text and '40' not in m.text[:3] else None)
    page.on('pageerror', lambda e: errors.append(('pageerror', str(e))))
    page.route('**/fonts.g*', lambda r: r.abort())

    # ---- inscription : le compte est en attente
    page.goto(BASE)
    page.wait_for_selector('form[data-form=signin]')
    page.click('[data-tab=up]')
    page.wait_for_selector('select[name=dept]')
    page.fill('input[name=prenom]', 'Alice'); page.fill('input[name=nom]', 'dupont')
    page.select_option('select[name=dept]', 'PEIP2 G2')
    page.fill('input[name=code]', '1234'); page.fill('input[name=code2]', '9999')
    page.click('form button.btn')
    page.wait_for_selector('.msg.err'); print('MISMATCH:', page.inner_text('.msg.err'))
    page.fill('input[name=code]', '1234'); page.fill('input[name=code2]', '1234')
    page.click('form button.btn')
    page.wait_for_selector('.msg.info'); print('SIGNUP:', page.inner_text('.msg.info'))
    st = dump()['peip2/students.json']['students'][0]
    assert st['nom'] == 'DUPONT' and st['approved'] is False and len(st['codeHash']) == 64 and '1234' not in json.dumps(st), st

    # ---- connexion refusée tant que non validé
    page.fill('input[name=nom]', 'DUPONT'); page.fill('input[name=code]', '1234')
    page.click('form button.btn'); page.wait_for_selector('.msg.err')
    print('PENDING LOGIN:', page.inner_text('.msg.err'))
    page.fill('input[name=code]', '0000'); page.click('form button.btn'); page.wait_for_selector('.msg.err')
    print('BAD CODE:', page.inner_text('.msg.err'))

    # ---- admin : mauvais mot de passe puis validation
    adm = ctx.new_page()
    adm.route('**/fonts.g*', lambda r: r.abort())
    adm.on('pageerror', lambda e: errors.append(('admin pageerror', str(e))))
    adm.goto(BASE + 'admin.html'); adm.wait_for_selector('form[data-form=login]')
    adm.fill('input[name=pw]', 'nope'); adm.click('form button.btn'); adm.wait_for_selector('.msg.err')
    print('ADMIN BAD PW:', adm.inner_text('.msg.err'))
    adm.fill('input[name=pw]', 'admin-test'); adm.click('form button.btn')
    adm.wait_for_selector('text=awaiting approval')
    adm.screenshot(path='/tmp/s_admin.png', full_page=True)
    adm.click('[data-act=approve]'); adm.wait_for_selector('text=approved')
    assert dump()['peip2/students.json']['students'][0]['approved'] is True

    # ---- connexion OK
    page.fill('input[name=nom]', 'DUPONT'); page.fill('input[name=code]', '1234'); page.click('form button.btn')
    page.wait_for_selector('text=Bonjour Alice')
    page.reload(); page.wait_for_selector('text=Bonjour Alice')      # session conservée

    # ---- leçon fermée par défaut : pas d'exercices, ni de sauvegarde possible
    page.goto(BASE + '#/ex/g01-guidee-a'); page.wait_for_timeout(800)
    assert page.locator('.item').count() == 0, 'exercices visibles alors que la leçon est fermée'
    print('CLOSED NOTICE:', page.inner_text('main').replace('\n', ' | ')[:160])
    page.goto(BASE + '#/'); page.wait_for_selector('text=Bonjour Alice')
    assert page.locator('a[href="#/chapter/G01"]').count() == 0 or 'opacity' in (page.get_attribute('.card:has-text("G01")', 'style') or '')
    # le professeur ouvre G01 (onglet Lessons)
    adm.click('[data-tab=lessons]'); adm.wait_for_selector('tr[data-lesson=G01]')
    assert 'closed' in adm.inner_text('tr[data-lesson=G01]')
    adm.click('tr[data-lesson=G01] [data-act=lessonOpen]'); adm.wait_for_selector('tr[data-lesson=G01] [data-act=lessonClose]')
    assert dump()['peip2/access.json']['lessons']['G01'] is True
    adm.click('[data-tab=students]'); adm.wait_for_selector('[data-act=approveAll]')
    assert adm.is_disabled('[data-act=approveAll]')        # visible mais inactif : personne en attente

    data = page.evaluate("""async () => { const m = await import('/data/index.js'); return m.SETS.map(s => ({id:s.id, items:s.items})); }""")
    def do_set(set_id, wrong_every=0):
        page.goto(BASE + '#/ex/' + set_id); page.wait_for_selector('.item')
        s = next(x for x in data if x['id'] == set_id)
        for i, it in enumerate(s['items']):
            sel = f'.item[data-id="{it["id"]}"]'; wrong = wrong_every and (i % wrong_every == 0); t = it['t']
            if t == 'cloze':
                g = page.locator(sel + ' .gap')
                for k in range(g.count()): g.nth(k).fill('zzz' if wrong else it['a'][k][0])
                page.click(sel + ' [data-act=check]')
            elif t == 'choice':
                page.click(sel + f' input[value="{(1 - it["c"]) if wrong else it["c"]}"]'); page.click(sel + ' [data-act=check]')
            elif t == 'text':
                page.fill(sel + ' input.wide', 'zzz' if wrong else ('Correct' if it.get('ok') else it['a'][0])); page.click(sel + ' [data-act=check]')
            else:
                page.fill(sel + ' textarea', 'ma reponse'); page.click(sel + ' [data-act=reveal]')
                page.click(sel + (' [data-act=self][data-v=done]' if t == 'essay' else f' [data-act=self][data-v="{0 if wrong else 1}"]'))
            page.wait_for_selector(sel + ' .fb')

    do_set('g01-guidee-a'); page.click('#finishBtn'); page.wait_for_selector('.score')
    print('SCORE A:', page.inner_text('.score').replace('\n', ' '))
    do_set('g01-niv-c', wrong_every=2); page.click('#finishBtn'); page.wait_for_selector('.score')
    print('SCORE C:', page.inner_text('.score').replace('\n', ' '))
    d = dump(); key = [k for k in d if k.startswith('peip2/attempts/')][0]
    print('ATTEMPT FILE:', key, 'n=', len(d[key]['attempts']))
    assert len(d[key]['attempts']) == 2

    # ---- carnet : reporter les erreurs, écrire, recharger
    page.click('[data-act=tonotes]'); page.wait_for_selector('#nbody')
    body = page.input_value('#nbody'); page.fill('#nbody', body + '\nMa règle : know = stative.')
    page.wait_for_selector('text=Enregistré à', timeout=8000)
    page.reload(); page.wait_for_selector('#nbody')
    assert 'Ma règle : know = stative.' in page.input_value('#nbody')
    # sauvegarde au changement de page (flush) : on écrit puis on quitte tout de suite
    page.fill('#nbody', page.input_value('#nbody') + '\nDernière ligne.'); page.goto(BASE + '#/history'); page.wait_for_selector('table')
    page.goto(BASE + '#/notes'); page.wait_for_selector('#nbody')
    assert 'Dernière ligne.' in page.input_value('#nbody'), 'flush au changement de page manquant'

    page.goto(BASE + '#/history'); page.wait_for_selector('table'); print('HISTORY rows:', page.locator('tbody tr').count())
    page.goto(BASE + '#/'); page.wait_for_selector('text=Bonjour Alice'); page.screenshot(path='/tmp/s_dash.png', full_page=True)

    # ---- admin : résultats, nouveau code, suppression en cascade
    adm.click('[data-tab=results]'); adm.wait_for_selector('text=Results'); adm.wait_for_selector('tbody tr')
    print('ADMIN RESULTS:', adm.inner_text('tbody tr').replace('\n', ' | ').replace('\t', ' '))
    adm.screenshot(path='/tmp/s_admin_res.png', full_page=True)
    adm.click('[data-tab=students]'); adm.wait_for_selector('[data-act=reset]')
    adm.click('[data-act=reset]'); adm.fill('input[data-code]', '4321'); adm.click('[data-act=resetOk]'); adm.wait_for_selector('text=New code saved')
    page.click('[data-act=logout]'); page.wait_for_selector('form[data-form=signin]')
    page.fill('input[name=nom]', 'DUPONT'); page.fill('input[name=code]', '1234'); page.click('form button.btn'); page.wait_for_selector('.msg.err')
    page.fill('input[name=code]', '4321'); page.click('form button.btn'); page.wait_for_selector('text=Bonjour Alice')
    print('RESET CODE OK')
    adm.click('[data-act=delete]'); adm.wait_for_selector('text=Are you sure?')
    adm.click('[data-m=next]'); adm.wait_for_selector('input[data-m=yes]')
    adm.fill('input[data-m=yes]', 'yes'); assert adm.is_disabled('[data-m=go]')          # il faut taper YES en majuscules
    adm.fill('input[data-m=yes]', 'YES'); adm.click('[data-m=go]'); adm.wait_for_selector('text=No accounts yet')
    d = dump(); print('FILES AFTER DELETE:', sorted(d.keys()))
    assert not [k for k in d if 'attempts/' in k or 'notes/' in k]
    page.reload(); page.wait_for_selector('form[data-form=signin]')    # le jeton ne vaut plus rien : compte supprimé
    print('SESSION REVOKED OK')

    # ---- panne GitHub : on ne doit jamais écraser students.json
    adm.fill if False else None
    page.click('[data-tab=up]'); page.wait_for_selector('select[name=dept]')
    page.fill('input[name=prenom]', 'Bob'); page.fill('input[name=nom]', 'martin'); page.select_option('select[name=dept]', 'PEIP2 G1')
    page.fill('input[name=code]', '1111'); page.fill('input[name=code2]', '1111')
    page.click('form button.btn'); page.wait_for_selector('.msg.info')
    before = json.dumps(dump()['peip2/students.json'], sort_keys=True)
    ctl(failReads=True)
    page.fill('input[name=nom]', 'ZED'); page.fill('input[name=code]', '2222'); page.click('form button.btn'); page.wait_for_selector('.msg.err')
    print('OUTAGE LOGIN:', page.inner_text('.msg.err'))
    page.click('[data-tab=up]'); page.wait_for_selector('select[name=dept]')
    page.fill('input[name=prenom]', 'Zed'); page.fill('input[name=nom]', 'zed'); page.select_option('select[name=dept]', 'PEIP2 G1')
    page.fill('input[name=code]', '2222'); page.fill('input[name=code2]', '2222'); page.click('form button.btn'); page.wait_for_selector('.msg.err')
    print('OUTAGE SIGNUP:', page.inner_text('.msg.err'))
    ctl(failReads=False)
    assert json.dumps(dump()['peip2/students.json'], sort_keys=True) == before, 'students.json écrasé pendant la panne !'
    print('NO OVERWRITE DURING OUTAGE OK')
    b.close()
print('ERRORS:', errors)
