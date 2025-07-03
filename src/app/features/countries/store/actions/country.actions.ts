import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Country } from '../../../../shared/models/country.interface';

export const CountryActions = createActionGroup({
  source: 'Country API',
  events: {
    // Actions for loading all countries
    'Load Countries': emptyProps(),
    'Load Countries Success': props<{ countries: Country[] }>(),
    'Load Countries Failure': props<{ error: string }>(),

    // Action to load a single country by its code
    'Load Country By Code': props<{ code: string }>(),
    'Load Country By Code Success': props<{ country: Country }>(),
    'Load Country By Code Failure': props<{ error: string }>(),
    
    // Actions for search and filter
    'Set Search Query': props<{ query: string }>(),
    'Set Filter Region': props<{ region: string }>(),
  },
});