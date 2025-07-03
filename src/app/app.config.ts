import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';


import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { countryReducer } from './features/countries/store/reducers/country.reducer';
import { CountryEffects } from './features/countries/store/effects/country.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),   provideHttpClient(),
  // NgRx Store Configuration
    provideStore({}), // Initializes the global store
    provideState({ name: 'countries', reducer: countryReducer }), // Registers our feature state
    provideEffects([CountryEffects]), // Registers our effects class
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode in production
      autoPause: true, // Pauses recording when DevTools window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action
      traceLimit: 75, // Maximum stack trace frames to be stored (in case trace option was provided as true)
    }),  
  ]
};
