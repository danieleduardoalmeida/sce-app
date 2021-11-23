import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AmostraModel } from '../model/amostra.model';

@Injectable({
  providedIn: 'root'
})


export class AmostraService {

  amostraUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/amostra';

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

  adicionarAmostra(amostra: AmostraModel): Observable<any> {
    let amostraData = serialize(amostra, false);
    return this.http.post<AmostraModel>(this.amostraUrl, amostraData, this.httpOptions);
  }

  listarAmostras(): Observable<AmostraModel[]> {
    return this.http.get<AmostraModel[]>(this.amostraUrl);
  }



  alterarAmostra(amostra: AmostraModel): Observable<any> {
    let amostraData = serialize(amostra, false);
    const url = `${this.amostraUrl}/${amostra.id}`;
    return this.http.put<AmostraModel>(url, amostraData, this.httpOptions);
  }

  removerAmostra(id: number): Observable<any> {
    const url = `${this.amostraUrl}/${id}`;
    return this.http.delete<AmostraModel>(url, this.httpOptions);
  }

  listarAmostraById(id: number): Observable<any> {
    const url = `${this.amostraUrl}/${id}`;
    return this.http.get<AmostraModel>(url);
  }
}