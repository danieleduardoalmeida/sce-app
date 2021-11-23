import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnaliseEspecieModel } from '../model/analise.especie.model';

@Injectable({
  providedIn: 'root'
})


export class AnaliseEspecieService {
  analiseEspecieUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/analiseEspecie';

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


  listarAnalisesEspecieByAnaliseId(id: number) {
    let url = `${this.analiseEspecieUrl}/analise/${id}`;
    return this.http.get<AnaliseEspecieModel[]>(url);
  }

  adicionarAnalisesEspecie(analisesEspecie: AnaliseEspecieModel[]): Observable<any> {
    let resultados: Observable<AnaliseEspecieModel>[] = [];
    for (let analiseEspecie of analisesEspecie) {
      resultados.push(this.adicionarAnaliseEspecie(analiseEspecie));
    }
    return forkJoin(resultados);
  }

  removerAnaliseEspecie(id: number): Observable<any> {
    let url = `${this.analiseEspecieUrl}/analise/${id}`;
    return this.http.delete<AnaliseEspecieModel>(url, this.httpOptions);
  }

  private adicionarAnaliseEspecie(analiseEspecie: AnaliseEspecieModel): Observable<any> {
    let analiseEspecieData = serialize(analiseEspecie, false);
    return this.http.post<AnaliseEspecieModel>(this.analiseEspecieUrl, analiseEspecieData, this.httpOptions);
  }


}