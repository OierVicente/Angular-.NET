import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClimaComponent } from './paginas/clima/clima.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './paginas/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './paginas/menu/menu.component';
import { NotFoundComponent } from './paginas/not-found/not-found.component';
import { UsuarioFormComponent } from './paginas/usuarios/usuario-form/usuario-form.component';
import { UsuariosComponent } from './paginas/usuarios/usuarios.component';
import { DataTablesModule } from "angular-datatables";
import { PasswordPipe } from './Pipes/filter.password';
import { FilterPipe } from './Pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ClimaComponent,
    LoginComponent,
    MenuComponent,
    NotFoundComponent,
    UsuarioFormComponent,
    UsuariosComponent,
    PasswordPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
