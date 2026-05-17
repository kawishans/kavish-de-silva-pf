import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'file-upload-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/upload') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const { filename, base64 } = JSON.parse(body);
                if (!filename || !base64) {
                  throw new Error('Missing filename or base64 data');
                }
                const destDir = path.join(process.cwd(), 'my assets', 'pf items');
                if (!fs.existsSync(destDir)) {
                  fs.mkdirSync(destDir, { recursive: true });
                }
                const destPath = path.join(destDir, filename);
                const buffer = Buffer.from(base64, 'base64');
                fs.writeFileSync(destPath, buffer);

                // Run sync script to copy newly uploaded asset immediately to public/assets/pf-items
                exec('node scripts/sync-assets.mjs', (err, stdout) => {
                  if (err) {
                    console.error('Asset Sync Error:', err);
                  } else {
                    console.log('Asset Sync Output:', stdout);
                  }
                  server.moduleGraph.invalidateAll();
                });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, path: `/assets/pf-items/${filename}` }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }
          next();
        });
      },
    },
  ],
});
