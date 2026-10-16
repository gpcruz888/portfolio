import { mkdir, readFile, writeFile } from 'node:fs/promises';
const base = await readFile('dist/index.html', 'utf8');
const metadata = JSON.parse(await readFile('src/metadata.json', 'utf8'));
for (const entry of metadata.cases) {
  let page = base
    .replace('<title>Gabriel Cruz | Product Designer</title>', `<title>${entry.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${entry.description}$2`)
    .replace('</head>', `<meta property="og:type" content="article"/><meta property="og:title" content="${entry.title}"/><meta property="og:description" content="${entry.description}"/><meta name="twitter:card" content="summary_large_image"/></head>`);
  // Supply only a verified production origin; never infer a hosting URL.
  if (process.env.SITE_ORIGIN) {
    const origin = new URL(process.env.SITE_ORIGIN).origin;
    page = page.replace('</head>', `<link rel="canonical" href="${origin}${entry.path}"/><meta property="og:url" content="${origin}${entry.path}"/><meta property="og:image" content="${origin}${entry.image}"/></head>`);
  }
  const directory = `dist${entry.path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, page);
  console.log(`Página estática gerada em ${entry.path}.`);
}
