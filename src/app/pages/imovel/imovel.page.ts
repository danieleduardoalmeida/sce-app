import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MaskPipe } from 'ngx-mask';
import { ImovelService } from 'src/app/service/imovel.service';
import { ImovelModel } from 'src/app/model/imovel.model';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.page.html',
  styleUrls: ['./imovel.page.scss'],
})

export class ImovelPage implements OnInit {
  imovelForm: FormGroup;
  edit: boolean;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private maskPipe: MaskPipe,
    public toastController: ToastController,
    private imovelService: ImovelService) {
    this.edit = false;
    this.imovelForm = this.criarImovelForm();
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarImovel();
  }

  remover() {
    this.imovelService.removerImovel(this.id)
    .subscribe(
      el => {
        this.mostrarToast("Imóvel removido com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível remover o imóvel", "erro");
      },
    );
  }

  salvar() {
    let imovel = this.preencherImovelModel(this.imovelForm.value);
    if (this.edit) {
      this.alterar(imovel);
    } else {
      this.adicionar(imovel);
    }
  }

  cancelar() {
    this.imovelForm.reset();
    this.voltarLista();
  }

  atualizarCampoMascara(event) {
    this.imovelForm.controls.cep.setValue(this.maskPipe.transform(event.currentTarget.value, '00000-000'));
  }

  private adicionar(imovel: ImovelModel) {
    this.imovelService.adicionarImovel(imovel)
      .subscribe(
        el => {
          this.mostrarToast("Imóvel adicionado com sucesso", "sucesso");
          this.voltarLista();
        },
        err => {
          this.mostrarToast("Não foi possível adicionar o imóvel", "erro");
        },
      );
  }

  private alterar(imovel: ImovelModel) {
    imovel.id = this.id;
    this.imovelService.alterarImovel(imovel)
      .subscribe(
        el => {
          this.mostrarToast("Imóvel alterado com sucesso", "sucesso");
          this.voltarLista();
        },
        err => {
          this.mostrarToast("Não foi possível alterar o imóvel", "erro");
        },
      );
  }

  private voltarLista() {
    this.router.navigateByUrl('imoveis', { skipLocationChange: true }).then(() => {
      this.router.navigate(['imoveis'])
    });
  }

  private preencherImovelModel(imovelFormValue: any) {
    let imovel = new ImovelModel();
    imovel.bairro = imovelFormValue.bairro;
    imovel.cep = imovelFormValue.cep;
    imovel.cidade = imovelFormValue.cidade;
    imovel.complemento = imovelFormValue.complemento;
    imovel.lado = imovelFormValue.lado;
    imovel.numero = imovelFormValue.numero;
    imovel.numeroQuarteirao = imovelFormValue.quarteirao;
    imovel.rua = imovelFormValue.rua;
    imovel.tipo = imovelFormValue.tipo;
    imovel.zona = imovelFormValue.zona;
    return imovel;
  }

  private preencherFormulario(imovel: any) {
    this.imovelForm.setValue(
      { 
        rua: imovel.rua, 
        numero: imovel.numero, 
        lado: imovel.lado,
        bairro: imovel.bairro,
        cep: imovel.cep,
        cidade: imovel.cidade,
        complemento: imovel.complemento,
        quarteirao: imovel.numeroQuarteirao,
        tipo: imovel.tipo,
        zona: imovel.zona
      });
  }

  private listarImovel(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      this.edit = true;
      this.id = Number(idParam);
      this.imovelService.listarImovelById(this.id)
        .subscribe(
          el => {
            this.preencherFormulario(el);
          },
          err => {
            this.mostrarToast("Não foi possível pesquisar o imóvel", "erro");
          },
        );
    }
  }

  private criarImovelForm() {
    return this.formBuilder.group({
      numero: ['',''],
      quarteirao: ['',],
      rua: ['', Validators.compose([Validators.maxLength(255)])],
      lado: ['', Validators.compose([Validators.minLength(7), Validators.maxLength(10)])],
      complemento: ['', Validators.compose([Validators.maxLength(20)])],
      cep: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      bairro: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      tipo: ['', Validators.compose([Validators.maxLength(20)])],
      zona: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      cidade: ['', Validators.compose([Validators.required, Validators.maxLength(100)])]
    });
  }

  private async mostrarToast(message: string, cssClass: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 10000,
      cssClass: cssClass
    });
    toast.present();
  }

}