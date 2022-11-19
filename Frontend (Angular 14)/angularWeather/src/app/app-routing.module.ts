import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ClimaComponent } from './paginas/clima/clima.component';
import { LoginComponent } from './paginas/login/login.component';
import { NotFoundComponent } from './paginas/not-found/not-found.component';
import { UsuarioFormComponent } from './paginas/usuarios/usuario-form/usuario-form.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';

const routes: Routes = [
  {path: '',redirectTo:'clima', pathMatch: 'full'},
  {path: 'clima',component:ClimaComponent},
  {path: 'usuarios',component:UsuariosComponent,
    // children: [
    //   { path: 'crear',component:UsuarioFormComponent},
    //   { path: 'editar/:id',component:UsuarioFormComponent}
    // ]
  },
  {path: 'login',component:LoginComponent},
  {path: '**', component: NotFoundComponent }
  ]
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]

})
export class AppRoutingModule { }
