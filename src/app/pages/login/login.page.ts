import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/autenticacao.service';
import { NavController } from '@ionic/angular';
import { AutenticacaoModel } from 'src/app/model/autenticacao.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authenticationService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
        usuario: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        senha: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit() { }

  esqueciSenha() {
    this.navCtrl.navigateRoot('/senha');
  }

  login() {
    let autenticacaoModel = this.preencherAutenticacaoModel(this.loginForm.value);
    this.authenticationService.login(autenticacaoModel);
  }

  private preencherAutenticacaoModel(loginFormValue: any) {
    let autenticacaoModel = new AutenticacaoModel();
    autenticacaoModel.senha = loginFormValue.senha;
    autenticacaoModel.usuario = loginFormValue.usuario;
    return autenticacaoModel;
  }


}
