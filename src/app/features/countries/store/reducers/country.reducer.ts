import { createReducer, on } from '@ngrx/store';
import { CountryActions } from '../actions/country.actions';
import { initialCountryState } from '../country.state';

export const countryReducer = createReducer(
  initialCountryState,

  // Reducers for loading all countries
  on(CountryActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    allCountries: countries,
    loading: false,
  })),
  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Reducer for loading a single country
  on(CountryActions.loadCountryByCodeSuccess, (state, { country }) => ({
    ...state,
    selectedCountry: country,
    loading: false,
  })),

  // Reducers for search and filter
  on(CountryActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  })),
  on(CountryActions.setFilterRegion, (state, { region }) => ({
    ...state,
    filterRegion: region,
  }))
);