# Auto-évaluation 1/0, compétences, onglet « À retravailler », vue admin des compétences.
import json, urllib.request
from playwright.sync_api import sync_playwright
BASE='http://localhost:8765/'
def call(path, body=None, tok=None):
    h={'Content-Type':'application/json'}
    if tok: h['Authorization']='Bearer '+tok
    r=urllib.request.Request(BASE+path, data=json.dumps(body).encode() if body is not None else None, headers=h, method='POST' if body is not None else 'GET')
    try: return json.load(urllib.request.urlopen(r))
    except urllib.error.HTTPError as e: return json.load(e)
errors=[]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    page=b.new_context(viewport={'width':1100,'height':900}).new_page()
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.route('**/fonts.g*', lambda r: r.abort())
    page.goto(BASE); page.wait_for_selector('form[data-form=signin]')
    page.click('[data-tab=up]'); page.wait_for_selector('select[name=dept]')
    page.fill('input[name=nom]','MARTIN'); page.fill('input[name=prenom]','Lea'); page.select_option('select[name=dept]','PEIP2 G2')
    page.fill('input[name=code]','4321'); page.fill('input[name=code2]','4321'); page.click('form button.btn'); page.wait_for_selector('.msg.info')
    tok=call('api/admin?resource=login',{'password':'admin-test'})['token']
    call('api/admin?resource=students',{'action':'approve','nom':'MARTIN'},tok)
    call('api/access',{'lesson':'G22','open':True},tok)
    page.click('[data-tab=in]'); page.wait_for_selector('form[data-form=signin]')
    page.fill('input[name=nom]','MARTIN'); page.fill('input[name=code]','4321'); page.click('form button.btn'); page.wait_for_selector('text=Hello Lea')
    # navigation : nouveaux onglets, pages vides
    nav=page.inner_text('nav'); assert 'My skills' in nav and 'To redo' in nav, nav
    page.goto(BASE+'#/skills'); page.wait_for_selector('h1:has-text("My skills")'); page.wait_for_timeout(500); assert 'Nothing to show yet' in page.inner_text('main')
    page.goto(BASE+'#/redo'); page.wait_for_selector('h1:has-text("To redo")'); page.wait_for_timeout(500); assert 'Nothing to redo yet' in page.inner_text('main')
    # exercice : 1 juste, 2 faux, 4 juste
    page.goto(BASE+'#/ex/g22-f01'); page.wait_for_selector('.item'); page.wait_for_timeout(500)
    page.fill('.item:nth-of-type(1) input.wide','how often does the ai model process new data'); page.click('.item:nth-of-type(1) [data-act=check]')
    page.fill('.item:nth-of-type(2) input.wide','What the engineers are training this week?'); page.click('.item:nth-of-type(2) [data-act=check]')
    page.fill('.item:nth-of-type(4) input.wide','In which year did the company release its first chatbot?'); page.click('.item:nth-of-type(4) [data-act=check]')
    cls=lambda n: page.get_attribute(f'.item:nth-of-type({n})','class')
    assert 'ok' in cls(1) and 'ko' in cls(2) and 'ok' in cls(4)
    # la case Ton point est préremplie d'après la correction
    assert page.get_attribute('.item:nth-of-type(1) [data-act=mark][data-v="1"]','aria-pressed')=='true'
    assert page.get_attribute('.item:nth-of-type(2) [data-act=mark][data-v="0"]','aria-pressed')=='true'
    # l'élève corrige : phrase 4 mise à 0 (il se juge faux), phrase 2 laissée à 0
    page.click('.item:nth-of-type(4) [data-act=mark][data-v="0"]'); assert 'ko' in cls(4)
    assert 'Provisional score: 1 / 100' not in page.inner_text('#runhead')
    print('HEAD:', page.inner_text('#runhead').replace('\n',' | '))
    assert 'Provisional score: 1 / 10' in page.inner_text('#runhead')
    page.click('[data-act=finish]'); page.click('[data-act=finish]'); page.wait_for_selector('.score', timeout=8000)
    assert page.inner_text('.score').replace(' ','').startswith('1/10'), page.inner_text('.score')
    # historique : une tentative
    page.goto(BASE+'#/history'); page.wait_for_selector('table'); page.wait_for_timeout(300); assert page.locator('tbody tr').count()==1
    # compétences : 1 juste (how often -> how + adj), 2 fausse (what), 4 fausse (when / which year)
    page.goto(BASE+'#/skills'); page.wait_for_selector('table'); page.wait_for_timeout(500)
    sk=page.inner_text('main'); print('SKILLS:', sk.replace('\n',' | ')[:500])
    rows=page.locator('tbody tr'); assert rows.count()==3, rows.count()
    first=rows.nth(0).inner_text(); assert '0 / 1' in first and 'Needs work' in first, first
    last=rows.nth(rows.count()-1).inner_text(); assert '1 / 1' in last and 'Solid' in last, last
    # accueil : carte des compétences
    page.goto(BASE+'#/'); page.wait_for_selector('text=Hello Lea'); page.wait_for_timeout(600)
    home=page.inner_text('main'); assert 'My skills to work on first' in home and 'Redo my 2 wrong sentence' in home, home[:600]
    # à retravailler : 2 phrases
    page.goto(BASE+'#/redo'); page.wait_for_selector('h1:has-text("To redo")'); page.wait_for_timeout(500)
    assert 'Redo everything (2)' in page.inner_text('main'), page.inner_text('main')
    assert page.locator('nav .pill.low').inner_text()=='2'
    page.click('[data-act=redoStart]:has-text("Redo everything")'); page.wait_for_selector('.item'); page.wait_for_timeout(500)
    assert page.locator('.item').count()==2
    ids=page.eval_on_selector_all('.item','els=>els.map(e=>e.dataset.id)'); print('REDO IDS:', ids)
    assert ids==['g22-f01.2','g22-f01.4'], ids
    page.fill('.item:nth-of-type(1) input.wide','What are the engineers training this week?'); page.click('.item:nth-of-type(1) [data-act=check]')
    assert 'ok' in cls(1)
    page.click('[data-act=finish]'); page.wait_for_selector('h1:has-text("To redo")', timeout=8000); page.wait_for_timeout(800)
    # l'item 2 réussi sort de la liste, il reste le 4 (non traité en reprise : dernier résultat inchangé)
    body=page.inner_text('main'); print('REDO AFTER:', body.replace('\n',' | ')[:300])
    assert 'Redo everything (1)' in body, body
    # la reprise n'a pas changé les scores d'exercice ni l'historique
    page.goto(BASE+'#/history'); page.wait_for_selector('table'); page.wait_for_timeout(300); assert page.locator('tbody tr').count()==1
    page.goto(BASE+'#/chapter/G22'); page.wait_for_selector('.setrow'); page.wait_for_timeout(300)
    assert '10 %' in page.inner_text('.setrow'), page.inner_text('.setrow')
    # filtre par compétence
    page.goto(BASE+'#/skills'); page.wait_for_selector('table'); page.wait_for_timeout(500)
    sk=page.inner_text('main'); assert '1 / 1' in sk
    # serveur : le champ adj est conservé, kind redo aussi
    stok=page.evaluate("JSON.parse(localStorage.getItem('peip2.session.v1')).token")
    at=call('api/attempts',None,stok)['attempts']; kinds=sorted((a.get('kind') or 'normal') for a in at); assert kinds==['normal','redo'], kinds
    first=[a for a in at if not a.get('kind')][0]; adj=[x for x in first['items'] if x.get('adj')]; assert [x['id'] for x in adj]==['g22-f01.4'], adj
    # admin : résultats avec items, et onglet Skills
    rs=call('api/admin?resource=results&items=1',None,tok)['rows'][0]; assert rs['items']['g22-f01.2']==1 and rs['items']['g22-f01.4']==0 and rs['items']['g22-f01.1']==1, rs['items']
    assert 'items' not in call('api/admin?resource=results',None,tok)['rows'][0]
    ap=b.new_context(viewport={'width':1100,'height':900}).new_page(); ap.on('pageerror', lambda e: errors.append(str(e))); ap.route('**/fonts.g*', lambda r: r.abort())
    ap.goto(BASE+'admin.html'); ap.wait_for_selector('form[data-form=login]'); ap.fill('input[name=pw]','admin-test'); ap.click('form button.btn'); ap.wait_for_selector('[data-tab=skills]')
    ap.click('[data-tab=skills]'); ap.wait_for_selector('table th:has-text("PEIP2 G2")'); ap.wait_for_timeout(500)
    at_=ap.inner_text('main'); print('ADMIN:', at_.replace('\n',' | ')[:400]); assert 'Questions: what' in at_ and 'PEIP2 G2' in at_
    ap.screenshot(path='/tmp/skills_admin.png')
    # onglet Content : toutes les séries, filtre par compétence, recherche, corrigé visible
    ap.click('[data-tab=content]'); ap.wait_for_selector('#clist details'); ap.wait_for_timeout(300)
    assert ap.locator('#clist details').count()==97, ap.locator('#clist details').count()
    assert '893 sentence(s)' in ap.inner_text('#clist'), ap.inner_text('#clist')[:120]
    ap.select_option('[data-cf=chapter]','G22'); ap.wait_for_timeout(200); assert '100 sentence(s) in 10' in ap.inner_text('#clist')
    ap.select_option('[data-cf=skill]','questions-how-many-how-much'); ap.wait_for_timeout(200)
    t=ap.inner_text('#clist'); assert 'How many' in t and 'Questions: how many / how much' in t, t[:300]
    ap.fill('[data-cf=q]','chatbot'); ap.wait_for_timeout(200); t=ap.inner_text('#clist'); print('CONTENT:', t.replace('\n',' | ')[:200])
    ap.click('[data-act=cfreset]'); ap.wait_for_selector('#clist details'); ap.fill('[data-cf=q]','chatbot'); ap.wait_for_timeout(200)
    t=ap.inner_text('#clist'); assert 'In which year did the company release its first chatbot?' in t, t[:400]
    ap.screenshot(path='/tmp/content_admin.png')
    # depuis Skills : clic sur une compétence ouvre Content filtré
    ap.click('[data-tab=skills]'); ap.wait_for_selector('table th:has-text("PEIP2 G2")'); ap.click('a[data-skill] >> nth=0'); ap.wait_for_selector('#clist details'); ap.wait_for_timeout(200)
    assert ap.input_value('[data-cf=skill]')!='', 'skill filter not applied'
    page.goto(BASE+'#/skills'); page.wait_for_selector('table'); page.wait_for_timeout(400); page.screenshot(path='/tmp/skills_student.png')
assert not errors, errors
print('SKILLS E2E OK')
