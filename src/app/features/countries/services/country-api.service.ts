import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, } from 'rxjs';
import { Country } from '../../../shared/models/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {

  private readonly baseUrl = 'https://restcountries.com/v3.1';

  // Define the fields we want to get from the API to keep the response payload small
  private readonly defaultFields = [
    'name', 'cca3', 'capital', 'region', 'subregion', 'population',
    'tld', 'currencies', 'languages', 'borders', 'flags',
  ].join(',');

  constructor(private http: HttpClient) {}

  
   // Fetches data for all countries with a minimal set of fields. [cite: 24]
  getAllCountries(): Observable<Country[]> {
    const params = new HttpParams().set('fields', this.defaultFields);
    return this.http.get<Country[]>(`${this.baseUrl}/all`, { params });
  }

  
   // Fetches detailed data for a specific country using its 3-letter code. [cite: 25]
  getCountryByCode(code: string): Observable<Country> {
    // The API returns an array even for a single country lookup by code
    return this.http
      .get<Country[]>(`${this.baseUrl}/alpha/${code}`)
      .pipe(map((countries) => countries[0])); //  extracts the single country from the array
  }

  //Fetches data for multiple countries, for displaying border countries.
  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    const params = new HttpParams().set('codes', codes.join(','));
    return this.http.get<Country[]>(`${this.baseUrl}/alpha`, { params });
  }
}
