import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DepositoVistoriaModel } from '../model/deposito.vistoria.model';

@Injectable({
  providedIn: 'root'
})


export class DepositoVistoriaService {
  depositoVistoriaUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/depositoVistoria';

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


  listarDepositoVistoriaByVistoriaId(id: number) {
    let url = `${this.depositoVistoriaUrl}/vistoria/${id}`;
    return this.http.get<DepositoVistoriaModel[]>(url);
  }

  adicionarDepositosVistoria(depositosVistoria: DepositoVistoriaModel[]): Observable<any> {
    let resultados: Observable<DepositoVistoriaModel>[] = [];
    for (let depositoVistoria of depositosVistoria) {
      resultados.push(this.adicionarDepositoVistoria(depositoVistoria));
    }
    return forkJoin(resultados);
  }

  removerDepositoVistoria(id: number): Observable<any> {
    let url = `${this.depositoVistoriaUrl}/vistoria/${id}`;
    return this.http.delete<DepositoVistoriaModel>(url, this.httpOptions);
  }

  private adicionarDepositoVistoria(depositoVistoria: DepositoVistoriaModel): Observable<any> {
    let depositoVistoriaData = serialize(depositoVistoria, false);
    return this.http.post<DepositoVistoriaModel>(this.depositoVistoriaUrl, depositoVistoriaData, this.httpOptions);
  }


}