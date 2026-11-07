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
    assert 'Sign in' in page.inner_text('.tabs') and 'Connexion' not in page.inner_text('body')   # anglais par défaut
    page.fill('input[name=nom]','martin')
    assert page.locator('[data-act=lang]').count()==0   # no language button for students
    txt=page.inner_text('body'); print('EN LOGIN:', txt.replace('\n',' | ')[:260])
    assert 'Sign in' in txt and 'Create an account' in txt and 'Connexion' not in txt
    assert page.evaluate('document.documentElement.lang')=='en'
    assert page.input_value('input[name=nom]').upper()=='MARTIN'
    page.click('[data-tab=up]'); page.wait_for_selector('select[name=dept]')
    page.fill('input[name=nom]','MARTIN'); page.fill('input[name=prenom]','Bob'); page.select_option('select[name=dept]','PEIP2 G1')
    page.fill('input[name=code]','4321'); page.fill('input[name=code2]','4321')
    page.click('form button.btn'); page.wait_for_selector('.msg.info'); print('SIGNUP EN:', page.inner_text('.msg.info'))
    page.fill('input[name=nom]','MARTIN'); page.fill('input[name=code]','4321'); page.click('form button.btn'); page.wait_for_selector('.msg.err')
    print('PENDING EN:', page.inner_text('.msg.err')); assert 'waiting for your teacher' in page.inner_text('.msg.err')
    page.fill('input[name=code]','0000'); page.click('form button.btn'); page.wait_for_selector('.msg.err')
    print('BAD CODE EN:', page.inner_text('.msg.err')); assert 'Incorrect NAME or code' in page.inner_text('.msg.err')
    tok=post('api/admin?resource=login',{'password':'admin-test'})['token']
    post('api/admin?resource=students',{'action':'approve','nom':'MARTIN'},tok)
    page.fill('input[name=code]','4321'); page.click('form button.btn'); page.wait_for_selector('text=Hello Bob')
    print('HOME EN:', page.inner_text('main').replace('\n',' | ')[:200])
    # closed by default
    page.goto(BASE+'#/ex/g01-guidee-a'); page.wait_for_timeout(800); assert page.locator('.item').count()==0
    print('CLOSED EN:', page.inner_text('main').replace('\n',' | ')[:160])
    stok=page.evaluate("JSON.parse(localStorage.getItem('peip2.session.v1')).token")
    r=post('api/attempts',{'set_id':'g01-guidee-a','items':[{'id':'g01-guidee-a.1','given':None,'ok':True,'done':True}],'score':1,'total':1},stok); print('CLOSED POST:', r); assert r.get('error')=='Cette leçon est fermée.'
    post('api/access',{'lesson':'G01','open':True},tok)
    page.goto(BASE+'#/'); page.wait_for_selector('text=Hello Bob')
    page.goto(BASE+'#/chapter/G01'); page.wait_for_selector('.setrow')
    body=page.inner_text('main'); print('CHAPTER EN:', body.replace('\n',' | ')[:300])
    assert 'Present Simple and Present Continuous' in body and 'Worksheet' in body and 'Murphy supplement' in body and 'Guided set A' in body
    page.click('summary'); rc=page.inner_text('.recap'); assert 'Time markers' in rc and 'Affirmative' in rc and 'Stative verbs' in rc
    page.goto(BASE+'#/ex/g01-guidee-a'); page.wait_for_selector('.item')
    page.click('.item:nth-of-type(1) [data-act=tonote]'); page.wait_for_selector('text=Added to your notes', timeout=8000)
    page.click('[data-act=hint]'); print('HINT EN:', page.inner_text('.hintline'))
    page.fill('.item:nth-of-type(1) .gap','drinks'); page.click('.item:nth-of-type(1) [data-act=check]')
    fb=page.inner_text('.item:nth-of-type(1) .fb'); print('FEEDBACK EN:', fb.replace('\n',' | '))
    assert 'en français' not in fb.lower() and 'expected answer' in fb.lower() and 'always indicates a habit' in fb
    page.fill('.item:nth-of-type(2) .gap','is cry'); page.click('.item:nth-of-type(2) [data-act=check]')
    fb2=page.inner_text('.item:nth-of-type(2) .fb'); assert 'not quite' in fb2.lower() and 'your answer' in fb2.lower()
    assert page.input_value('.item:nth-of-type(2) .gap')=='is cry'
    # exercice avec annotation anglaise et traduction
    page.goto(BASE+'#/ex/g01-guidee-b'); page.wait_for_selector('.item'); page.wait_for_timeout(500)
    assert '(thinking in progress)' in page.inner_text('.item:nth-of-type(2)') and 'réflexion' not in page.inner_text('main')
    page.goto(BASE+'#/ex/g01-niv-c'); page.wait_for_selector('.item')
    t=page.inner_text('main'); assert 'Correct the sentence. Write the whole sentence' in t and 'Translate into English.' in t
    page.fill('.item:nth-of-type(1) input.wide','She knows the answer.'); page.click('.item:nth-of-type(1) [data-act=check]')
    assert 'Correct' in page.inner_text('.item:nth-of-type(1) .fb')
    page.click('.item:nth-of-type(6) [data-act=reveal]'); print('MODEL EN:', page.inner_text('.item:nth-of-type(6) .fb').replace('\n',' | '))
    page.goto(BASE+'#/ex/g01-bonus'); page.wait_for_selector('.item')
    page.click('.item:nth-of-type(1) [data-act=reveal]'); fbb=page.inner_text('.item:nth-of-type(1) .fb'); assert 'standard grammar' in fbb, fbb
    page.click('.item:nth-of-type(1) [data-act=self][data-v="1"]')
    page.click('[data-act=finish]'); page.click('[data-act=finish]'); page.wait_for_selector('.score')
    print('ATTEMPT EN:', page.inner_text('main').replace('\n',' | ')[:200])
    page.click('[data-act=tonotes]'); page.wait_for_selector('#nbody'); nb=page.input_value('#nbody'); print('NOTE EN:', nb[:200].replace('\n',' | '))
    assert 'Exercise : Bonus: going further' in nb or 'Exercise' in nb
    page.goto(BASE+'#/history'); page.wait_for_selector('table'); h=page.inner_text('main'); print('HISTORY EN:', h.replace('\n',' | ')[:200]); assert 'My history' in h and 'Review' in h
    page.reload(); page.wait_for_selector('main'); assert 'My history' in page.inner_text('main')
    adm = page.context.new_page(); adm.route('**/fonts.g*', lambda r: r.abort()); adm.on('pageerror', lambda e: errors.append(str(e)))
    adm.goto(BASE+'admin.html'); adm.wait_for_selector('form[data-form=login]')
    assert 'Administrator password' in adm.inner_text('body')
    adm.fill('input[name=pw]','nope'); adm.click('form button.btn'); adm.wait_for_selector('.msg.err'); assert adm.inner_text('.msg.err')=='Incorrect password.', adm.inner_text('.msg.err')
    adm.fill('input[name=pw]','admin-test'); adm.click('form button.btn'); adm.wait_for_selector('table')
    at=adm.inner_text('body'); print('ADMIN EN:', at.replace('\n',' | ')[:220])
    assert 'Students' in at and 'Student site' in at and 'Sign out' in at and 'approved' in at
    assert not any(c in at for c in 'éèàç')
    adm.click('[data-tab=results]'); adm.wait_for_selector('tbody tr'); rt=adm.inner_text('body'); assert 'different exercise sets' in rt.lower() and 'sort by' in rt.lower()
    adm.click('[data-tab=lessons]'); adm.wait_for_selector('tr[data-lesson=G01]'); lt=adm.inner_text('tr[data-lesson=G01]'); assert 'open' in lt.lower(), lt
    adm.click('tr[data-lesson=G01] [data-act=lessonClose]'); adm.wait_for_selector('tr[data-lesson=G01] [data-act=lessonOpen]')
    r=post('api/attempts',{'set_id':'g01-guidee-a','items':[{'id':'g01-guidee-a.1','given':None,'ok':True,'done':True}],'score':1,'total':1},stok); print('CLOSED AGAIN:', r); assert r.get('error')=='Cette leçon est fermée.'
    adm.click('[data-tab=students]'); adm.wait_for_selector('[data-act=deleteAll]')
    adm.click('[data-act=deleteAll]'); adm.click('[data-m=next]'); adm.fill('input[data-m=yes]','YES'); adm.click('[data-m=go]'); adm.wait_for_selector('text=No accounts yet')
    r=post('api/admin?resource=students',{'action':'deleteAll'},tok); print('NO CONFIRM:', r); assert 'error' in r
    print('ERRORS:', errors); assert not errors
    print('EN E2E OK')
