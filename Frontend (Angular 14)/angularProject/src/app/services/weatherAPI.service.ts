import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  apiKey = 'd74018e0f1338b55b1cfc648d3bf4f3c';
  URI:string = '';

  constructor(private httpClient: HttpClient) {
      this.URI= environment.apiWeather+`/data/2.5/weather?appid=${this.apiKey}&units=metric&lang=es&q=`;
      //https://api.openweathermap.org/data/2.5/weather?appid=d74018e0f1338b55b1cfc648d3bf4f3c&units=metric&lang=es&q=
   }

   getWeather(nombreCiudad:string){
    //Ejemplo https://api.openweathermap.org/data/3.0/weather?appid=d74018e0f1338b55b1cfc648d3bf4f3c&q=Madrid,es
    //return this.httpClient.get(`${this.URI}${nombreCiudad},${codigoPais}`)
    return this.httpClient.get(`${this.URI}${nombreCiudad}`)

   }
}
