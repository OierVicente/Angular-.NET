import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelos/usuario.interface';

// export interface Usuario{
//     _id: number;
//     _nombre: string;
//     _contraseña: string;

// }

@Injectable({
  providedIn: 'root'
})

export class minimalAPI {

    //API
    private readonly api:string = environment.apiMinimal;

    constructor(private http: HttpClient) {}

    // login(form:LoginI):Observable<ResponseI>{
    //     let direccion = this.url + "/auth";
    //     return this.httpClient.post<ResponseI>(direccion,form);
    // }
    login(usuario:string,password:string):Observable<Response>{
      const body = {
        nombre: usuario,
        password: password
      };
      return this.http.post<Response>(this.api+"/login",body);
    }

    getAllUsuarios():Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.api+"/usuarios");
    }

    getUsuarioById(id:number):Observable<Usuario>{
      return this.http.get<Usuario>(`${this.api+"/usuarios"}/${id}`);
    }

    createUsuario(usuario:Usuario):Observable<Usuario>{
        const body =  {
          nombre: usuario.nombre,
          password: usuario.password
        };
        return this.http.post<Usuario>(this.api+"/usuarios",body);
    }

    updateUsuario(usuario:Usuario):Observable<void>{
      const body = {
        nombre: usuario.nombre,
        password: usuario.password
      };
      return this.http.put<void>(`${this.api+"/usuarios"}/${usuario.id}`,body);
    }
    deleteUsuario(id:number):Observable<void>{
      return this.http.delete<void>(`${this.api+"/usuarios"}/${id}`);
    }

}
