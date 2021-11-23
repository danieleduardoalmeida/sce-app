import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TratamentoModel } from '../model/tratamento.model';


@Injectable({
  providedIn: 'root'
})


export class TratamentoService {
  tratamentoUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/tratamento';

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

  listarTratamentos(): Observable<TratamentoModel[]> {
    return this.http.get<TratamentoModel[]>(this.tratamentoUrl);
  }

  adicionarTratamento(tratamento: TratamentoModel): Observable<any> {
    let tratamentoData = serialize(tratamento, false);
    return this.http.post<TratamentoModel>(this.tratamentoUrl, tratamentoData, this.httpOptions);
  }

  alterarTratamento(tratamento: TratamentoModel): Observable<any> {
    let tratamentoData = serialize(tratamento, false);
    const url = `${this.tratamentoUrl}/${tratamento.id}`;
    return this.http.put<TratamentoModel>(url, tratamentoData, this.httpOptions);
  }

  removerTratamento(id: number): Observable<any> {
    const url = `${this.tratamentoUrl}/${id}`;
    return this.http.delete<TratamentoModel>(url, this.httpOptions);
  }

  removerTratamentoByVistoriaId(vistoriaId: number): Observable<any> {
    const url = `${this.tratamentoUrl}/vistoria/${vistoriaId}`;
    return this.http.delete<TratamentoModel>(url, this.httpOptions);
  }

  listarTratamentoById(id: number): Observable<any> {
    const url = `${this.tratamentoUrl}/${id}`;
    return this.http.get<TratamentoModel>(url);
  }
}