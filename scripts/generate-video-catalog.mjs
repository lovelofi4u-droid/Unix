import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.resolve(process.cwd(), 'public/videos');
const outputFile = path.resolve(process.cwd(), 'src/data/videoCatalog.ts');
const videoExts = new Set(['.mp4', '.webm', '.mov', '.m4v', '.ogg']);

const categoryMap = {
  short: { label: 'Short Form', folders: ['short', 'short-form', 'short-video'] },
  long: { label: 'Long Form', folders: ['long', 'long-form', 'full', 'full-video'] },
  saas: { label: 'SaaS Video', folders: ['saas', 'saas-video'] },
};

function listVideoFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return listVideoFiles(fullPath);
      }
      return videoExts.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
    })
    .sort((a, b) => a.localeCompare(b));
}

function toPublicPath(filePath) {
  const relative = path.relative(path.resolve(process.cwd(), 'public'), filePath).replace(/\\/g, '/');
  return `/${relative}`;
}

const catalog = {
  short: [],
  long: [],
  saas: [],
};

const seen = new Set();

for (const [key, config] of Object.entries(categoryMap)) {
  const dirs = config.folders.map((folder) => path.join(rootDir, folder));
  const files = [...new Set(dirs.flatMap((dir) => listVideoFiles(dir)))];

  for (const file of files) {
    const publicPath = toPublicPath(file);
    if (seen.has(publicPath)) continue;
    seen.add(publicPath);
    catalog[key].push({
      id: `${key}-${catalog[key].length + 1}`,
      category: config.label,
      src: publicPath,
    });
  }
}

const rootFiles = listVideoFiles(rootDir);
for (const file of rootFiles) {
  const publicPath = toPublicPath(file);
  if (seen.has(publicPath)) continue;
  seen.add(publicPath);
  catalog.short.push({
    id: `short-${catalog.short.length + 1}`,
    category: 'Short Form',
    src: publicPath,
  });
}

const content = `export type VideoItem = {
  id: string;
  category: string;
  src: string;
};

export const shortVideos: VideoItem[] = ${JSON.stringify(catalog.short, null, 2)};

export const longVideos: VideoItem[] = ${JSON.stringify(catalog.long, null, 2)};

export const saasVideos: VideoItem[] = ${JSON.stringify(catalog.saas, null, 2)};
`;

fs.writeFileSync(outputFile, `${content}\n`);
console.log('Video catalog generated:', JSON.stringify(catalog, null, 2));
