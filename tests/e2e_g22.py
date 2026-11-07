# G22 : soulignement, correction des questions, variantes acceptées, carnet de notes.
import json, hashlib, urllib.request
from playwright.sync_api import sync_playwright
BASE='http://localhost:8765/'
def post(path, body, tok=None):
    h={'Content-Type':'application/json'}
    if tok: h['Authorization']='Bearer '+tok
    r=urllib.request.Request(BASE+path, data=json.dumps(body).encode(), headers=h, method='POST')
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
    page.fill('input[name=nom]','DURAND'); page.fill('input[name=prenom]','Eva'); page.select_option('select[name=dept]','PEIP2 G1')
    page.fill('input[name=code]','1234'); page.fill('input[name=code2]','1234'); page.click('form button.btn'); page.wait_for_selector('.msg.info')
    tok=post('api/admin?resource=login',{'password':'admin-test'})['token']
    post('api/admin?resource=students',{'action':'approve','nom':'DURAND'},tok)
    page.click('[data-tab=in]'); page.wait_for_selector('form[data-form=signin]')
    page.fill('input[name=nom]','DURAND'); page.fill('input[name=code]','1234'); page.click('form button.btn'); page.wait_for_selector('text=Hello Eva')
    # fermé par défaut
    page.goto(BASE+'#/ex/g22-f01'); page.wait_for_timeout(800); assert page.locator('.item').count()==0
    stok=page.evaluate("JSON.parse(localStorage.getItem('peip2.session.v1')).token")
    r=post('api/attempts',{'set_id':'g22-f01','items':[{'id':'g22-f01.1','given':None,'ok':True,'done':True}],'score':1,'total':1},stok); assert r.get('error')=='Cette leçon est fermée.', r
    post('api/access',{'lesson':'G22','open':True},tok)
    page.goto(BASE+'#/'); page.wait_for_selector('text=Hello Eva'); page.wait_for_timeout(500)
    home=page.inner_text('main'); assert 'G22' in home and 'underlined' in home.lower(), home[:400]
    page.goto(BASE+'#/chapter/G22'); page.wait_for_selector('.setrow'); body=page.inner_text('main'); print('CHAPTER:', body.replace('\n',' | ')[:260])
    assert body.count('Start')>=10
    page.click('summary'); rc=page.inner_text('.recap'); assert 'How often' in rc and 'Present Perfect Continuous' in rc and 'no extra auxiliary' in rc
    page.goto(BASE+'#/ex/g22-f01'); page.wait_for_selector('.item'); page.wait_for_timeout(500)
    assert page.locator('.item').count()==10
    ul=page.locator('.item:nth-of-type(1) u.ul').inner_text(); assert ul=='every hour', ul
    assert page.locator('.item:nth-of-type(9) u.ul').inner_text()=='the bug'
    assert 'Ask the question about the underlined words.' in page.inner_text('.item:nth-of-type(1) .instr')
    # 1 : bonne réponse (casse, pas de ?), 2 : mauvaise, 3 : variante, 5 : Who were, 9 : subordonnée devant
    ans={1:'how often does the ai model process new data',2:'What the engineers are training this week?',4:'In which year did the company release its first chatbot?',5:'Who were reviewing the algorithm when they found the bug?',9:'By the time the update was released, what had already affected thousands of users?',10:'How many AI models will the lab have trained by 2030?'}
    for n,a in ans.items():
        page.fill(f'.item:nth-of-type({n}) input.wide',a); page.click(f'.item:nth-of-type({n}) [data-act=check]')
    cls=lambda n: page.get_attribute(f'.item:nth-of-type({n})','class')
    print([ (n,cls(n)) for n in ans])
    for n in (1,4,5,9,10): assert 'ok' in cls(n), n
    assert 'ko' in cls(2)
    fb=page.inner_text('.item:nth-of-type(2) .fb'); assert 'What are the engineers training this week?' in fb and 'Present Continuous' in fb, fb
    # indice = temps de la phrase, sans la réponse
    page.click('.item:nth-of-type(3) [data-act=hint]'); h=page.inner_text('.item:nth-of-type(3) .hintline'); assert h=='Tense of the sentence: Present Perfect Simple.', h
    # carnet : la phrase est envoyée avec le segment entre crochets
    page.click('.item:nth-of-type(3) [data-act=tonote]'); page.wait_for_selector('text=Added to your notes', timeout=8000)
    page.goto(BASE+'#/notes'); page.wait_for_selector('main'); page.wait_for_timeout(800)
    nt=' '.join(page.eval_on_selector_all('textarea','els=>els.map(e=>e.value)')); print('NOTES:', nt.replace('\n',' | ')[:300]); assert '[twelve data scientists]' in nt
    # exercice entier : terminer et enregistrer
    page.goto(BASE+'#/ex/g22-f01'); page.wait_for_selector('.item'); page.wait_for_timeout(500)
    page.click('[data-act=finish]') if page.locator('[data-act=finish]').count() else None
    print('G22 E2E OK' if not errors else ('ERRORS: '+str(errors)))
