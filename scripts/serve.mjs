import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'dist');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png' };

http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${port}`);
  let filePath = normalize(join(root, url.pathname));
  if (!filePath.startsWith(root)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = join(filePath, 'index.html');
    res.setHeader('Content-Type', types[extname(filePath)] || 'application/octet-stream');
    createReadStream(filePath).pipe(res);
  } catch {
    try {
      const fallback = await readFile(join(root, 'index.html'));
      res.writeHead(200, { 'Content-Type': types['.html'] });
      res.end(fallback);
    } catch {
      res.writeHead(404).end('Not found');
    }
  }
}).listen(port, () => console.log(`Akosua Creates site running at http://localhost:${port}`));
