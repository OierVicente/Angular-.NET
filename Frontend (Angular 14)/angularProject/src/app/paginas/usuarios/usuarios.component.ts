import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelos/usuario.interface';
import { minimalAPI } from 'src/app/services/minimalAPI.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  //Variables Datatable
  // @ViewChild(DataTableDirective, {static: false})
  // dtElement!: DataTableDirective;
  // dtOptions: DataTables.Settings = {};
  // dtTrigger= new Subject<any>();

  listaUsuarios:Usuario[] = [];
  seleccionado!:string;
  usuarioEditar!:Usuario;
  filtroBuscar:string = '';

  constructor(private minimalApi:minimalAPI) { }

  ngOnInit(): void {
    this.rellenarDatatable();
  }

  rellenarDatatable():void{
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 15,
    //   language: {
    //     url: '//cdn.datatables.net/plug-ins/1.13.1/i18n/es-ES.json'
    //   }
    // };

    this.minimalApi.getAllUsuarios().subscribe(
      data => {
        console.log("data =>",data);
        this.listaUsuarios = data;

        },
        error => {
          console.log("error =>",error);
        })
  }

  // CREATE
  btnCrearUsuario(): void {
    this.seleccionado = 'Crear';
    this.usuarioEditar = {} as Usuario;
  }

  addUsuarioAListaOutput(usuario: Usuario):void{
    this.listaUsuarios.push(usuario);

    console.log("Despues de Crear Push => ", this.listaUsuarios);
  }

  // UPDATE
  btnEditarUsuario(usuarioEditarButton:Usuario): void {
    this.seleccionado = 'Editar';
    this.usuarioEditar = usuarioEditarButton;
  }
  updateUsuarioAListaOutput(usuario: Usuario):void{

    let index = this.listaUsuarios.indexOf(usuario);
    this.listaUsuarios[index] = usuario;

    // const tempArr = this.listaUsuarios.filter(item => item.Id !== usuario.Id)
    // this.listaUsuarios = [...tempArr, usuario];

    console.log("Despues de Updatear => ", this.listaUsuarios);
  }

  editarSeleccionadoOutput(cadena:string):void{
    this.seleccionado = cadena;
  }

  deleteUsuario(id:number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar el Usuario?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.minimalApi.deleteUsuario(id).subscribe(
          data => {
            console.log("data =>",data);
            this.clearSeleccionado();
            },
            error => {
              console.log("error =>",error);
            });

            this.listaUsuarios.forEach((usuario,index)=>{
              if(usuario.id==id) this.listaUsuarios.splice(index,1);
            });
            // const tempArr = this.listaUsuarios.filter(usuario => usuario.Id !== id);

            // this.listaUsuarios = [...tempArr];

            this.seleccionado = '';
        Swal.fire('Eliminado!','Eliminado correctamente', 'success');
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardaron', '', 'info');
      }
    })
  }

  clearSeleccionado(): void {
    this.seleccionado = '';
  }

}
