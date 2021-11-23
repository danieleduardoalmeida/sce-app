import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelatorioModel } from '../model/relatorio.model';

@Injectable({
  providedIn: 'root'
})

export class RelatorioService {
  relatorioUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/report/vistoria/imovel';

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

  gerarRelatorio(id: number, dataVistoria: string): Observable<RelatorioModel[]> {
    const url = `${this.relatorioUrl}/${id}?dataVistoria=${dataVistoria}`;
    return this.http.get<RelatorioModel[]>(url);
  }
}