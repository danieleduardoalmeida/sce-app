import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepositoModel } from '../model/deposito.model';

@Injectable({
  providedIn: 'root'
})


export class DepositoService {
  depoistoUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/deposito';

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

  listarDepositos(): Observable<DepositoModel[]> {
    return this.http.get<DepositoModel[]>(this.depoistoUrl);
  }

  listarDepositoById(id: number): Observable<any> {
    let url = `${this.depoistoUrl}/${id}`;
    return this.http.get<DepositoModel>(url);
  }
}