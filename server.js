// Static server for the EZ Check funnel. Every response is noindex.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = __dirname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
const ROUTES = { '/': 'index.html', '/book': 'book.html', '/thank-you': 'thank-you.html', '/privacy': 'privacy.html', '/terms': 'terms.html' };
http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = ROUTES[p] || path.basename(p);
  fs.readFile(path.join(ROOT, file), (e, d) => {
    if (e || !TYPES[path.extname(file)]) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)], 'x-robots-tag': 'noindex, nofollow' });
    res.end(d);
  });
}).listen(process.env.PORT || 3000);
