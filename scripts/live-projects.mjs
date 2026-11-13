import { readFile, readdir } from 'node:fs/promises';
import projects from '../src/live-projects.json' with { type: 'json' };

const root = new URL('../projetos/', import.meta.url);
const routes = new Map();
const directory = '/projetos-ao-vivo/';
const gymPath = '/projetos/gymcare/';
const gymRoot = new URL('gymcare/', root);

async function gymFiles() {
  const entries = await readdir(gymRoot, { recursive: true, withFileTypes: true });
  return entries.filter(entry => entry.isFile()).map(entry => {
    const directory = entry.parentPath.slice(decodeURIComponent(gymRoot.pathname).length);
    return directory ? `${directory}/${entry.name}` : entry.name;
  }).filter(file => /^(?:css|js|font|icons|image\/[^/]+)\/.+\.(?:css|js|jpg|jpeg|png|svg|webp|gif|woff2?|ttf|eot|avif)$/i.test(file)
    || /^[^/]+\.html$/.test(file) && file !== 'demo.html');
}

for (const project of projects) {
  const morada = project.id === '01';
  const files = [
    'index.html',
    'about.html',
    morada ? 'project-grid.html' : 'service.html',
    'projeto.css',
    morada ? 'assets/css/bootstrap.min.css' : 'assets/css/bootstrap.css',
    'assets/css/spacing.css',
    'assets/css/main.css',
    `assets/img/projeto/${project.cover}`,
    morada ? 'assets/img/projeto/interior.jpg' : 'assets/img/projeto/planejamento.jpg',
    ...(morada ? [] : ['assets/img/finance/hero/btn-arrow.svg']),
  ];
  if (!morada) {
    for (const weight of ['Bold', 'DemiBold', 'Light', 'Medium', 'Regular']) {
      files.push(`assets/fonts/TT Hoves Pro Trial ${weight}.woff`);
    }
  }

  for (const file of files) {
    routes.set(`${directory}${project.slug}/${file}`, `${project.id}/${file}`);
  }
}

export function liveProjectPages() {
  return {
    name: 'live-project-pages',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost');
        const pathname = decodeURI(url.pathname);
        const key = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
        const file = routes.get(key);
        if (file) request.url = `/projetos/${encodeURI(file)}${url.search}`;
        next();
      });
    },
    async generateBundle() {
      const gym = await Promise.all((await gymFiles()).map(async file => ({
        file,
        source: await readFile(new URL(file, gymRoot)),
      })));
      // The original pages use both image/ and gymcare/image/ for local assets.
      const aliases = new Set(gym.filter(({ file }) => file.endsWith('.html')).flatMap(({ source }) =>
        [...source.toString().matchAll(/\bgymcare\/(image\/[^"'\s<>)]+)/g)].map(match => match[1])));
      for (const { file, source } of gym) {
        this.emitFile({ type: 'asset', fileName: gymPath.slice(1) + file, source });
        if (aliases.has(file)) {
          this.emitFile({ type: 'asset', fileName: gymPath.slice(1) + 'gymcare/' + file, source });
        }
      }

      await Promise.all([...routes].map(async ([path, file]) => {
        this.emitFile({
          type: 'asset',
          fileName: path.slice(1),
          source: await readFile(new URL(file, root)),
        });
      }));
    },
  };
}
