import { Country } from "../../../shared/models/country.interface"; 

// Defines the shape of the NgRx state for the countries feature
export interface CountryState {
  allCountries: Country[];
  selectedCountry: Country | null;
  borderCountries: Country[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filterRegion: string;
}

// Defines the initial or default state
export const initialCountryState: CountryState = {
  allCountries: [],
  selectedCountry: null,
  borderCountries: [],
  loading: false,
  error: null,
  searchQuery: '',
  filterRegion: '',
};