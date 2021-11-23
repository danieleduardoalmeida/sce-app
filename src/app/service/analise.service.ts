import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnaliseModel } from '../model/analise.model';

@Injectable({
    providedIn: 'root'
})


export class AnaliseService {
  analiseUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/analise';

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

  analises: any;

  constructor(private http: HttpClient) { }

    listarAnalises(): Observable<AnaliseModel[]>{
      return this.http.get<AnaliseModel[]>(this.analiseUrl);
    }

    listarAnalisesAbertas(): Observable<AnaliseModel[]>{
      const url = `${this.analiseUrl}/aberta`;
      return this.http.get<AnaliseModel[]>(url);
    }

    adicionarAnalise(analise: AnaliseModel): Observable<any>{
      let analiseData = serialize(analise, false);
      return this.http.post<AnaliseModel>(this.analiseUrl, analiseData, this.httpOptions);
    }
     

    alterarAnalise(analise: AnaliseModel): Observable<any> {
      let analiseData = serialize(analise, false);
      console.log(analiseData);
      const url = `${this.analiseUrl}/${analise.id}`;
      return this.http.put<AnaliseModel>(url, analiseData, this.httpOptions);
    }

    removerAnalise(id: number): Observable<any>{
      const url = `${this.analiseUrl}/${id}`;
      return this.http.delete<AnaliseModel>(url, this.httpOptions);
    }

    listarAnaliseById(id: number): Observable<any> {
      const url = `${this.analiseUrl}/${id}`;
      return this.http.get<AnaliseModel>(url);
    }

    listarAnaliseByVistoriaId(id: number) {
      let url = `${this.analiseUrl}/vistoria/${id}`;
      return this.http.get<AnaliseModel[]>(url);
    }
}