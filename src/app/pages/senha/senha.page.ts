import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SenhaService } from 'src/app/service/senha.service';
import { SenhaModel } from 'src/app/model/senha.model';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.page.html',
  styleUrls: ['./senha.page.scss'],
})
export class SenhaPage implements OnInit {
  senhaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    public toastController: ToastController,
    private senhaService: SenhaService) {
    this.senhaForm = this.formBuilder.group({
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      senhaNova: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      senhaAntiga: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit() { }

  alterar() {
    let senhaModel = this.preencherSenhaModel(this.senhaForm.value);
    this.senhaService.alterarSenha(senhaModel)
      .subscribe(
        el => {
          this.mostrarToast("Senha alterada com sucesso", "sucesso");
          this.voltarLogin();
        },
        err => {
          this.mostrarToast("Não foi possível alterar a senha", "erro");
        },
      );
  }

  cancelar() {
    this.senhaForm.reset();
    this.voltarLogin();
  }

  private voltarLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  private async mostrarToast(message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: cssClass
    });
    toast.present();
  }

  private preencherSenhaModel(senhaFormValue: any) {
    let senhaModel = new SenhaModel();
    senhaModel.senhaAntiga = senhaFormValue.senhaAntiga;
    senhaModel.senhaNova = senhaFormValue.senhaNova;
    senhaModel.usuario = senhaFormValue.usuario;
    return senhaModel;
  }
}
