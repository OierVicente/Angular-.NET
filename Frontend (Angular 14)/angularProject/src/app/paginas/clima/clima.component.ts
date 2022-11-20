import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { WeatherService } from '../../services/weatherAPI.service';
import { CitiesService } from '../../services/CitiesAPI.service';
import swal from 'sweetalert2';
import { CiudadesJson } from 'src/app/modelos/citiesJson.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css'],
  providers: [WeatherService,CitiesService]
})
export class ClimaComponent implements OnInit {

  climaForm!: FormGroup;
  @ViewChildren('objetoCiudad') ciudadInput!: ElementRef;
  // nombreCiudad!:HTMLInputElement;
  clima: any;
  iconSrc:any;
  descripcion!:string;
  dateNow: Date = new Date();

  //Variables Autocompletar
  // listaCiudades:AutoCompletObject[] = [];
  // public keyword = "Madrid";
  keyword = 'name';
  listaCiudades:any = [];

  constructor(private weatherService:WeatherService,private citiesService:CitiesService,private el: ElementRef){
    this.climaForm = this.createClimaFrom();
  }
  createClimaFrom(){
    return new FormGroup({
      objetoCiudad: new FormControl('',[Validators.required, Validators.minLength(3)])
    });
  }

  ngOnInit(): void {
    this.citiesService.getCiudades()
    .subscribe(
      (result: CiudadesJson) => {
        for(let i = 0 ; i < result.RECORDS.length ; i++){
          //Solo filtramos por ciudades españolas
          if(result.RECORDS[i].country_long == "Spain"){
            this.listaCiudades.push({
              id: (i+1),
              name: result.RECORDS[i].owm_city_name
            });
          }
        }
        this.listaCiudades = this.eliminaItemsDuplicadosArray(this.listaCiudades);
        console.log("listaCiudades =>",this.listaCiudades);
        // console.log(result.RECORDS[100].owm_city_name);

      }
    )
  }

  eliminaItemsDuplicadosArray(arr:any[]) {

    const unicos: any[] = [];

    for(var i = 0; i < arr.length; i++) {

      const elemento = arr[i];

      if (!unicos.includes(arr[i])) {
        unicos.push(elemento);
      }
    }

    return unicos;
  }

  submitClimaForm(){
    console.log(this.climaForm.value);
    console.log(this.climaForm.value.objetoCiudad);
    console.log(this.climaForm.value.objetoCiudad.name);
    let ciudad;

    //Ponemos este if porque con el ng-autocomplete diferenciamos si clicka en la busqueda que le autecompleta o simplemente le da al tabulador

    if(this.climaForm.value.objetoCiudad.name != undefined)
      ciudad = this.climaForm.value.objetoCiudad.name;
    else if(this.climaForm.value.objetoCiudad != undefined)
      ciudad = this.climaForm.value.objetoCiudad;

    // if(this.climaForm.valid || ciudad != undefined){
    if(ciudad != undefined){
      this.obtenerClima(ciudad);

      this.onResetForm();
    }else{
      swal.fire('Error !',"Datos vacíos o incorrectos.",'error');
    }

    // this.climaForm.value.objetoCiudad.focus();

    return false;
  }

  onResetForm(): void {
    this.climaForm.reset();
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
          if(err.status == 404) swal.fire('Ciudad no encontrada!',`La ciudad ${nombreCiudad} no ha sido encontrada`,'warning');
          else swal.fire('Error !',"Se ha producido un error",'error');
        },
      )
    }

  letraInicialMayusculas(cadena:string){

      const palabras = cadena.split(" ");

      return palabras.map((palabra) => {
          return palabra[0].toUpperCase() + palabra.substring(1);
      }).join(" ");
  }

}
