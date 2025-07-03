import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CountryApiService } from '../../services/country-api.service';
import { CountryActions } from '../actions/country.actions';

@Injectable()
export class CountryEffects {
  constructor(
    private actions$: Actions,
    private countryApiService: CountryApiService
  ) {}

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      exhaustMap(() =>
        this.countryApiService.getAllCountries().pipe(
          map((countries) =>
            CountryActions.loadCountriesSuccess({ countries })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error: error.message }))
          )
        )
      )
    )
  );
  
  loadCountryByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountryByCode),
      exhaustMap(({ code }) =>
        this.countryApiService.getCountryByCode(code).pipe(
          map((country) =>
            CountryActions.loadCountryByCodeSuccess({ country })
          ),
          catchError((error) =>
            of(CountryActions.loadCountryByCodeFailure({ error: error.message }))
          )
        )
      )
    )
  );
}