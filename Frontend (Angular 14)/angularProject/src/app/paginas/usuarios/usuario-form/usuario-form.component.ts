import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { param } from 'jquery';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { minimalAPI } from 'src/app/services/minimalAPI.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnChanges, OnInit, OnDestroy {

  usuarioForm:FormGroup;
  @Input() seleccionado!: string;
  seleccionado2!: string;
  @Input() usuarioEditar!: Usuario;
  // @Input() listaUsuarios: Usuario[] = [];
  @Output() addUsuarioEvent = new EventEmitter<Usuario>();
  @Output() updateUsuarioEvent = new EventEmitter<Usuario>();
  @Output() seleccionadoEvent = new EventEmitter<string>();
  // texto!:string;
  // id!:number;
  usuarioPostear!:Usuario;

  constructor(private readonly activatedRouter: ActivatedRoute,private minimalApi:minimalAPI, private readonly router: Router) {
    this.usuarioForm = this.CreateFrom();
   }

   CreateFrom(){
    return new FormGroup({
      usuario: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('',[Validators.required, Validators.minLength(3)])
    });
  }

   ngOnChanges(changes: SimpleChanges): void {
    console.log("changes => ",changes);
    if(changes['seleccionado'] != undefined)
      this.seleccionado = changes['seleccionado'].currentValue;

    if(this.seleccionado == "Crear"){
      this.usuarioForm.patchValue( {'usuario':null,'password':null} );
    }
  }

   ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  clearSeleccionado(): void {
    this.seleccionadoEvent.emit('');
  }



  // onSubmit(): void {

  //   if(this.seleccionado == 'Crear'){
  //     this.createUsuario();
  //   }else if(this.seleccionado == 'Editar'){
  //     this.updateUsuario();
  //   }

  // }

  createUsuario(): void {
    console.log(this.usuarioForm);
    Swal.fire({
      title: '¿Está seguro de crear el Usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioPostear = {
          id: 0,
          nombre: this.usuarioForm.value.usuario,
          password: this.usuarioForm.value.password
        };
            // console.log("this.usuario =>",this.usuarioFormulario);
            // console.log("this.listaUsuarios =>",this.listaUsuarios);
            // this.listaUsuarios.push(this.usuarioFormulario);
            // this.clearSeleccionado();
        this.minimalApi.createUsuario(this.usuarioPostear).subscribe(
          data => {
            console.log("data =>",data);
            //Recuperamos la Id que ha puesto la API
            this.usuarioPostear.id = data.id;
            this.addUsuarioEvent.emit(this.usuarioPostear);
            this.clearSeleccionado();
            Swal.fire('Correcto','Creado correctamente','success');
            },
            error => {
              console.log("error =>",error);
              Swal.fire('Error !','Se ha producido un error','error');

            })
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardaron', '', 'info');
      }
    })


  }

  updateUsuario(): void {
    console.log(this.usuarioForm);
    Swal.fire({
      title: '¿Está seguro de editar el Usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioPostear = {
          id: this.usuarioEditar.id,
          nombre: this.usuarioForm.value.usuario,
          password: this.usuarioForm.value.password
        };
            // console.log("this.usuarioFormulario =>",this.usuarioFormulario);
            // const tempArr = this.listaUsuarios.filter(item => item.Id !== this.usuarioEditar.Id)
            // console.log("tempArr =>",tempArr);
            // this.listaUsuarios = [...tempArr, this.usuarioFormulario];
            // console.log("this.listaUsuarios =>",this.listaUsuarios);
            // this.clearSeleccionado();
        this.minimalApi.updateUsuario(this.usuarioPostear).subscribe(
          data => {
            console.log("data =>",data);
            this.updateUsuarioEvent.emit(this.usuarioPostear);
            this.clearSeleccionado();
            Swal.fire('Editado !','Editado correctamente','success');
            },
            error => {
              console.log("error =>",error);
              Swal.fire('Error !','Se ha producido un error','error');

            })
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardaron', '', 'info');
      }
    })


  }

}
