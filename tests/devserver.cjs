// Serveur de test local : faux GitHub (API contents) + site statique + fonctions /api (comme Vercel).
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto'), url = require('url');

const GH_PORT = 9101, SITE_PORT = Number(process.env.PORT || 8765);
const files = new Map();                       // chemin -> { content(base64), sha }
const ctl = { failReads: false, putLog: [] };  // pour provoquer des pannes en test
const sha1 = b => crypto.createHash('sha1').update(b).digest('hex');

process.env.GITHUB_API_URL = `http://127.0.0.1:${GH_PORT}`;
process.env.GITHUB_TOKEN = 'test-token';
process.env.DATA_REPO = 'test/data';
process.env.ADMIN_HASH = crypto.createHash('sha256').update('admin-test').digest('hex');

// ---- faux GitHub
http.createServer((req, res) => {
  const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', () => {
    const u = url.parse(req.url);
    if (u.pathname === '/__ctl') { Object.assign(ctl, JSON.parse(Buffer.concat(chunks).toString() || '{}')); res.end(JSON.stringify({ ok: true, putLog: ctl.putLog.length })); return; }
    if (u.pathname === '/__dump') { const o = {}; files.forEach((v, k) => { o[k] = JSON.parse(Buffer.from(v.content, 'base64').toString()); }); res.end(JSON.stringify(o)); return; }
    const m = u.pathname.match(/^\/repos\/test\/data\/contents\/(.+)$/);
    const send = (code, obj) => { res.statusCode = code; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj || {})); };
    if (!m) return send(404, { message: 'no route' });
    if (req.headers.authorization !== 'Bearer test-token') return send(401, { message: 'bad credentials' });
    const p = decodeURI(m[1]);
    if (req.method === 'GET') {
      if (ctl.failReads) return send(500, { message: 'boom' });
      const f = files.get(p); if (!f) return send(404, { message: 'Not Found' });
      return send(200, { content: f.content, sha: f.sha });
    }
    const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
    const cur = files.get(p);
    if (req.method === 'PUT') {
      if (cur && body.sha !== cur.sha) return send(409, { message: 'sha mismatch' });
      if (!cur && body.sha) return send(422, { message: 'invalid sha' });
      const f = { content: body.content, sha: sha1(body.content + Math.random()) };
      files.set(p, f); ctl.putLog.push(p);
      return send(cur ? 200 : 201, { content: { sha: f.sha } });
    }
    if (req.method === 'DELETE') {
      if (!cur) return send(404, {});
      if (body.sha !== cur.sha) return send(409, {});
      files.delete(p); return send(200, {});
    }
    send(405, {});
  });
}).listen(GH_PORT);

// ---- site + fonctions
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
http.createServer((req, res) => {
  const u = url.parse(req.url, true);
  if (u.pathname.startsWith('/api/')) {
    const name = u.pathname.slice(5).replace(/[^a-z]/g, '');
    const file = path.join(__dirname, '..', 'api', name + '.js');
    if (name.startsWith('_') || !fs.existsSync(file)) { res.statusCode = 404; return res.end('{}'); }
    const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', () => {
      const raw = Buffer.concat(chunks).toString();
      req.query = u.query; try { req.body = raw ? JSON.parse(raw) : {}; } catch (e) { req.body = {}; }
      res.status = c => { res.statusCode = c; return res; };
      res.json = o => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(o)); return res; };
      require(file)(req, res);
    });
    return;
  }
  let p = decodeURIComponent(u.pathname); if (p === '/') p = '/index.html';
  const f = path.join(__dirname, '..', p);
  if (!f.startsWith(path.join(__dirname, '..')) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.statusCode = 404; return res.end('not found'); }
  res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).pipe(res);
}).listen(SITE_PORT, () => console.log('site http://localhost:' + SITE_PORT));
