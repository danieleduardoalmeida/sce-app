import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExemplarAnaliseEspecieModel } from '../model/exemplar.analise.especie.model';

@Injectable({
  providedIn: 'root'
})


export class ExemplarAnaliseEspecieService {
  exemplarAnaliseUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/exemplarAnalise';

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


  listarExemplarAnalisesByAnaliseId(id: number) {
    let url = `${this.exemplarAnaliseUrl}/analise/${id}`;
    return this.http.get<ExemplarAnaliseEspecieModel[]>(url);
  }
  
  adicionarExemplaresAnalise(exemplaresAnalise: ExemplarAnaliseEspecieModel[]): Observable<any> {
    let resultados: Observable<ExemplarAnaliseEspecieModel>[] = [];
    for (let exemplarAnalise of exemplaresAnalise) {
      resultados.push(this.adicionarExemplarAnalise(exemplarAnalise));
    }
    return forkJoin(resultados);
  }

  removerExemplarAnalise(id: number): Observable<any> {
    let url = `${this.exemplarAnaliseUrl}/analise/${id}`;
    return this.http.delete<ExemplarAnaliseEspecieModel>(url, this.httpOptions);
  }

  private adicionarExemplarAnalise(exemplarAnalise: ExemplarAnaliseEspecieModel): Observable<any> {
    let exemplarAnaliseData = serialize(exemplarAnalise, false);
    return this.http.post<ExemplarAnaliseEspecieModel>(this.exemplarAnaliseUrl, exemplarAnaliseData, this.httpOptions);
  }


}