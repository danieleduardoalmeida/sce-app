import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VistoriaModel } from '../model/vistoria.model';

@Injectable({
  providedIn: 'root'
})

export class VistoriaService {
  vistoriaUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/vistoria';

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

  listarVistorias(): Observable<VistoriaModel[]> {
    return this.http.get<VistoriaModel[]>(this.vistoriaUrl);
  }

  adicionarVistoria(vistoria: VistoriaModel): Observable<any> {
    let vistoriaData = serialize(vistoria, false);
    console.log(vistoriaData);
    return this.http.post<VistoriaModel>(this.vistoriaUrl, vistoriaData, this.httpOptions);
  }

  alterarVistoria(vistoria: VistoriaModel): Observable<any> {
    let vistoriaData = serialize(vistoria, false);
    const url = `${this.vistoriaUrl}/${vistoria.id}`;
    return this.http.put<VistoriaModel>(url, vistoriaData, this.httpOptions);
  }

  removerVistoria(id: number): Observable<any>{
    const url = `${this.vistoriaUrl}/${id}`;
    return this.http.delete<VistoriaModel>(url, this.httpOptions);
  }

  listarVistoriaById(id: number): Observable<any> {
    const url = `${this.vistoriaUrl}/${id}`;
    return this.http.get<VistoriaModel>(url);
  }
}