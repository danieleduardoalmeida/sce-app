import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MaskPipe } from 'ngx-mask';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})

export class UsuarioPage implements OnInit {
  usuarioForm: FormGroup;
  edit: boolean;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private maskPipe: MaskPipe,
    private toastController: ToastController,
    private usuarioService: UsuarioService) {
    this.edit = false;
    this.usuarioForm = this.criarUsuarioForm();
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarUsuario();
  }

  salvar() {
    let usuario = this.preencherUsuarioModel(this.usuarioForm.value);
    if (this.edit) {
      this.alterar(usuario);
    } else {
      this.adicionar(usuario);
    }
  }

  cancelar() {
    this.usuarioForm.reset();
    this.voltarLista();
  }

  remover(id: string) {
    this.usuarioService.removerUsuario(Number(id))
    .subscribe(
      el => {
        this.mostrarToast("Usuário removido com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível remover o usuário", "erro");
      },
    );
  }

  atualizarCampoMascara(event) {
    this.usuarioForm.controls.telefone.setValue(this.maskPipe.transform(event.currentTarget.value, '(00) 00000-0000'));
  }

  private voltarLista() {
    this.router.navigateByUrl('usuarios', { skipLocationChange: true }).then(() => {
      this.router.navigate(['usuarios'])
    });
  }

  private alterar(usuario: UsuarioModel) {
    usuario.id = this.id;
    this.usuarioService.alterarUsuario(usuario)
    .subscribe(
      el => {
        this.mostrarToast("Usuário alterado com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível alterar o usuário", "erro");
      },
    );
  }

  private adicionar(usuario: UsuarioModel) {
    this.usuarioService.adicionarUsuario(usuario)
    .subscribe(
      el => {
        this.mostrarToast("Usuário adicionado com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível adicionar o usuário", "erro");
      },
    );
  }

  private preencherUsuarioModel(usuarioFormValue: any) {
    let usuario = new UsuarioModel();
    usuario.nome = usuarioFormValue.nome;
    usuario.senha = usuarioFormValue.senha;
    usuario.email = usuarioFormValue.email;
    usuario.login = usuarioFormValue.usuario;
    usuario.telefone = usuarioFormValue.telefone;
    usuario.tipo = usuarioFormValue.tipo;
    return usuario;
  }

  private listarUsuario(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      this.edit = true;
      this.id = Number(idParam);
      this.usuarioService.listarUsuarioById(this.id)
      .subscribe(
        el => {
          this.preencherFormulario(el);
        },
        err => {
          this.mostrarToast("Não foi possível pesquisar o usuário", "erro");
        },
      );
    } else {
      this.adicionarValidacaoSenhaFormulario();
    }
  }

  private criarUsuarioForm() {
    return this.formBuilder.group({
      senha: ['', ''],
      tipo: ['', Validators.compose([Validators.required])],
      telefone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(20)])],
      usuario: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
      email: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern('[A-Za-z0-9._%+-]{2,}@[a-zA-Z-_.]{2,}[.]{1}[a-zA-Z]{2,}')])]
    });
  }

  private adicionarValidacaoSenhaFormulario() {
    let senhaControl = this.usuarioForm.get('senha');
    senhaControl.setValidators([Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
    senhaControl.updateValueAndValidity();
  }

  private preencherFormulario(usuario: UsuarioModel) {
    this.usuarioForm.setValue({
      nome: usuario.nome,
      email: usuario.email,
      usuario: usuario.login,
      telefone: usuario.telefone,
      tipo: usuario.tipo,
      senha: ""
    });
  }

  private async mostrarToast(message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: cssClass
    });
    toast.present();
  }
}