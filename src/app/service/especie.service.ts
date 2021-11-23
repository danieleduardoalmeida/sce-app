import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EspecieModel } from '../model/especie.model';

@Injectable({
  providedIn: 'root'
})


export class EspecieService {
  especieUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/especie';

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

  listarEspecies() : Observable<EspecieModel[]> {
    return this.http.get<EspecieModel[]>(this.especieUrl);
  }

  listarEspecie(id: number): Observable<any> {
    const url = `${this.especieUrl}/${id}`;
    return this.http.get<EspecieModel>(url);
  }
}