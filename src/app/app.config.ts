import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',      // Префикс для CSS классов (по умолчанию 'p')
          darkModeSelector: '.dark-mode' // Опционально: для тёмной темы
        }
      },
      ripple: true
    })
  ]
};
