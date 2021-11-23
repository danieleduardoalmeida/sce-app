import { Injectable } from '@angular/core';
import { serialize } from 'typescript-json-serializer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImovelModel } from '../model/imovel.model';

@Injectable({
  providedIn: 'root'
})

export class ImovelService {
  imovelUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/imovel';

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

  listarImoveis(): Observable<ImovelModel[]> {
    return this.http.get<ImovelModel[]>(this.imovelUrl);
  }

  adicionarImovel(imovel: ImovelModel): Observable<ImovelModel> {
    let imovelData = serialize(imovel, false);
    console.log(imovelData);
    return this.http.post<ImovelModel>(this.imovelUrl, imovelData, this.httpOptions);
  }

  alterarImovel(imovel: ImovelModel): Observable<any> {
    let imovelData = serialize(imovel, false);
    const url = `${this.imovelUrl}/${imovel.id}`;
    return this.http.put<ImovelModel>(url, imovelData, this.httpOptions);
  }

  removerImovel(id: number): Observable<any> {
    const url = `${this.imovelUrl}/${id}`;
    return this.http.delete<ImovelModel>(url, this.httpOptions);
  }

  listarImovelById(id: number): Observable<any> {
    const url = `${this.imovelUrl}/${id}`;
    return this.http.get<ImovelModel>(url);
  }
}