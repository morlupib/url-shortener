import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run url-shortener:serve',
        production: 'nx run url-shortener:preview',
      },
      ciWebServerCommand: 'nx run url-shortener:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
