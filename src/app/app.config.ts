import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';

import {routes} from './Routes/app.routes';
import {provideHttpClient} from '@angular/common/http';
import {AuthGuard} from './Routes/AuthGards';
import { fr } from "primelocale/fr.json"
import customPreset from './custom.preset';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    AuthGuard,
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {provide: LOCALE_ID, useValue: 'fr'},
    providePrimeNG({
      translation: fr,
      theme: {
        preset: customPreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng'
          }
        }
      }
    })
  ]
};
