import { readFile } from 'node:fs/promises';
import projects from '../src/live-projects.json' with { type: 'json' };

const root = new URL('../projetos/', import.meta.url);
const routes = new Map();
const directory = '/projetos-ao-vivo/';

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
