import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { serialize } from 'typescript-json-serializer';
import { AutenticacaoModel } from '../model/autenticacao.model';
import { UsuarioModel } from '../model/usuario.model';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  autenticacaoUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/autenticacao';
  usuarioUrl = 'https://sce-app-heroku.herokuapp.com/v1/sce/usuario';
  hasLoggedIn = 'hasLoggedIn';
  usuarioLogado = new UsuarioModel;
  usuarioSubject = new Subject<any>();

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

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private navCtrl: NavController,) { }

  login(autenticacao: AutenticacaoModel) {
    this.autenticarUsuario(autenticacao).subscribe(
      el => {
        this.buscarDadosUsuario(autenticacao.usuario);
      },
      err => {
        this.mostrarToast(err.error);
      },
    );
  }

  publicarUsuarioLogado(usuario: any) {
    this.usuarioSubject.next(usuario);
  }

  getUsuarioLogadoObservable(): Subject<any> {
    return this.usuarioSubject;
  }

  private buscarDadosUsuario(login: string) {
    this.buscarUsuario(login).subscribe(
      el => {
        this.usuarioLogado = el;
        this.publicarUsuarioLogado(this.usuarioLogado);
        this.navCtrl.navigateRoot('/home');
      },
      err => {
        this.mostrarToast(err.error);
      },
    );
  }

  private async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  logout() {
    this.navCtrl.navigateRoot('/login');
  }

  getUsuario() {
    return this.usuarioLogado;
  }

  getUsername() {
    return this.usuarioLogado.login;
  }

  usuarioAuth() {
    return this.usuarioLogado;
  }

  private buscarUsuario(login: string): Observable<any> {
    let url = `${this.usuarioUrl}/username/${login}`;
    return this.http.get<UsuarioModel>(url, this.httpOptions);
  }

  private autenticarUsuario(autenticacao: AutenticacaoModel): Observable<any> {
    let autenticacaoData = serialize(autenticacao, false);
    return this.http.post<AutenticacaoModel>(this.autenticacaoUrl, autenticacaoData, this.httpOptions);
  }
}
