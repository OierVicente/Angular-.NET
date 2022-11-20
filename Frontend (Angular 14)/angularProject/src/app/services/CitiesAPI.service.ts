import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CitiesService {
  URI:string = '';

  constructor(private httpClient: HttpClient) {
    // https://github.com/manifestinteractive/openweathermap-cities/blob/master/README.md
    this.URI= `https://raw.githubusercontent.com/manifestinteractive/openweathermap-cities/master/data/owm_city_list.json`;
   }

   getCiudades():any{
    return this.httpClient.get<any>(`${this.URI}`);

   }
}
