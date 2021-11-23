import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExemplarModel } from '../model/exemplar.model';

@Injectable({
  providedIn: 'root'
})

export class ExemplarService {
  exemplarUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/exemplar';

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

  listarExemplares(): Observable<ExemplarModel[]> {
    return this.http.get<ExemplarModel[]>(this.exemplarUrl);
  }

  listarExemplar(id: number): Observable<any> {
    const url = `${this.exemplarUrl}/${id}`;
    return this.http.get<ExemplarModel>(url);
  }
}