import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const srcRoot = join(root, 'my assets');
const publicRoot = join(root, 'public', 'assets');

const logoSources = [
  { src: join(root, 'adobe assets', 'SVG', 'Logo.svg'), dest: join(root, 'public', 'logo.svg') },
  { src: join(root, 'adobe assets', 'SVG', 'wh_Logo.svg'), dest: join(root, 'public', 'logo-dark.svg') },
];

function syncLogos() {
  for (const { src, dest } of logoSources) {
    if (existsSync(src)) {
      cpSync(src, dest, { force: true });
    }
  }
}

const mappings = [
  { from: 'videos', to: 'videos', filter: (f) => /\.(mp4|webm|mov)$/i.test(f) },
  { from: 'Clients', to: 'clients', filter: (f) => /\.png$/i.test(f) },
  { from: 'images', to: 'images', filter: (f) => /\.(jpe?g|png|gif|webp)$/i.test(f) },
  { from: 'pf items', to: 'pf-items', filter: () => true },
];

function copyDir(relFrom, relTo, filter, recursive = false) {
  const fromDir = join(srcRoot, relFrom);
  const toDir = join(publicRoot, relTo);
  if (!existsSync(fromDir)) return [];

  mkdirSync(toDir, { recursive: true });
  const copied = [];

  function walk(currentFrom, currentTo, baseRel = '') {
    for (const name of readdirSync(currentFrom)) {
      const src = join(currentFrom, name);
      const relPath = baseRel ? `${baseRel}/${name}` : name;

      if (statSync(src).isDirectory()) {
        if (recursive) {
          const nestedTo = join(currentTo, name);
          mkdirSync(nestedTo, { recursive: true });
          walk(src, nestedTo, relPath);
        }
        continue;
      }

      if (!filter(name)) continue;
      const dest = join(currentTo, name);
      mkdirSync(join(dest, '..'), { recursive: true });
      cpSync(src, dest, { force: true });
      const urlPath = relPath.split('/').map(encodeURIComponent).join('/');
      copied.push(`/assets/${relTo}/${urlPath}`);
    }
  }

  walk(fromDir, toDir);
  return copied.sort((a, b) => a.localeCompare(b));
}

syncLogos();

const manifest = { generatedAt: new Date().toISOString(), videos: [], clients: [], images: [], pfItems: [] };

for (const { from, to, filter } of mappings) {
  const key =
    to === 'videos' ? 'videos' : to === 'clients' ? 'clients' : to === 'images' ? 'images' : 'pfItems';
  const recursive = to === 'pf-items';
  manifest[key] = copyDir(from, to, filter, recursive);
}

mkdirSync(join(root, 'src', 'generated'), { recursive: true });
writeFileSync(join(root, 'src', 'generated', 'assetManifest.json'), JSON.stringify(manifest, null, 2));
console.log('Assets synced:', manifest);
