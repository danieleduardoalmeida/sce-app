import { Injectable } from '@angular/core';
import { SenhaModel } from '../model/senha.model';
import { serialize } from 'typescript-json-serializer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SenhaService {
  senhaUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/senha';

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


  alterarSenha(senha: SenhaModel): Observable<any> {
    console.log(senha);
    let senhaData = serialize(senha, false);
    return this.http.post<SenhaModel>(this.senhaUrl, senhaData, this.httpOptions);
  }
}