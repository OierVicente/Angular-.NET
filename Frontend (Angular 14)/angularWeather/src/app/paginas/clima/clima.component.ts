import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weatherAPI.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  clima: any;
  iconSrc:any;
  descripcion!:string;
  dateNow: Date = new Date();

  constructor(private weatherService:WeatherService){

  }
  ngOnInit(): void {

  }

obtenerClima(nombreCiudad: string){
  this.weatherService.getWeather(nombreCiudad)
    .subscribe(
      res => {
        console.log(res),
        this.clima = res,
        // this.descripcion = this.letraInicialMayusculas(this.clima.weather[0].description);
        this.iconSrc = `http://openweathermap.org/img/w/${this.clima.weather[0].icon}.png`;
      },
      err =>{
        console.log(err.status);
        if(err.status = 404) swal.fire('Ciudad no encontrada!',`La ciudad ${nombreCiudad} no ha sido encontrada`,'warning');
        else swal.fire('Error !',"Se ha producido un error",'error');
      },
    )
}

  submitFormulario(nombreCiudad:HTMLInputElement){
    if(nombreCiudad.value){
      this.obtenerClima(nombreCiudad.value);

      nombreCiudad.value = '';
    }else{
      alert("Campos vacíos. Por favor introduzca algún valor.")
    }

      nombreCiudad.focus();

      return false;
  }

  letraInicialMayusculas(cadena:string){

      const palabras = cadena.split(" ");

      return palabras.map((palabra) => {
          return palabra[0].toUpperCase() + palabra.substring(1);
      }).join(" ");
  }

}
