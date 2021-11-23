import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  usuarioUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/usuario';

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    )
  };


  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(this.usuarioUrl);
  }

  adicionarUsuario(usuario: UsuarioModel): Observable<any> {
    let usuarioData = serialize(usuario, false);
    return this.http.post<UsuarioModel>(this.usuarioUrl, usuarioData, this.httpOptions);
  }

  alterarUsuario(usuario: UsuarioModel): Observable<any> {
    let usuarioData = serialize(usuario, false);
    const url = `${this.usuarioUrl}/${usuario.id}`;
    return this.http.put<UsuarioModel>(url, usuarioData, this.httpOptions);
  }

  removerUsuario(id: number): Observable<any>{
    let url = `${this.usuarioUrl}/${id}`;
    return this.http.delete<UsuarioModel>(url, this.httpOptions);
  }

  listarUsuarioById(id: number): Observable<any> {
    let url = `${this.usuarioUrl}/${id}`;
    return this.http.get<UsuarioModel>(url);
  }

  listarUsuarioByLogin(login: string): Observable<any> {
    let url = `${this.usuarioUrl}/${login}`;
    return this.http.get<UsuarioModel>(url);
  }
}