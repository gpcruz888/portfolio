import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import metadata from './src/metadata.json';
export default defineConfig({
  plugins: [tailwindcss(), {
    name: 'case-static-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = req.url?.split('?')[0];
        if (metadata.cases.some(entry => entry.path === path)) {
          req.url = req.url!.replace(path!, `${path}/index.html`);
        }
        next();
      });
    },
  }],
});
