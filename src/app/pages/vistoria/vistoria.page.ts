import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { VistoriaModel } from 'src/app/model/vistoria.model';
import { ImovelModel } from 'src/app/model/imovel.model';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { DepositoModel } from 'src/app/model/deposito.model';
import { DepositoVistoriaModel } from 'src/app/model/deposito.vistoria.model';
import { VistoriaService } from 'src/app/service/vistoria.service';
import { ImovelService } from 'src/app/service/imovel.service';
import { DepositoService } from 'src/app/service/deposito.service';
import { AuthenticationService } from 'src/app/service/autenticacao.service';
import { DepositoVistoriaService } from 'src/app/service/deposito.vistoria.service';

@Component({
  selector: 'app-vistoria',
  templateUrl: './vistoria.page.html',
  styleUrls: ['./vistoria.page.scss'],
})

export class VistoriaPage implements OnInit {
  vistoriaForm: FormGroup;
  edit: boolean;
  id: number;
  imoveis: ImovelModel[];
  depositos: DepositoModel[];
  depositosSelecionados: DepositoModel[];
  depositosVistoria: DepositoVistoriaModel[];
  usuarioLogado: UsuarioModel;
  mostrarDepositos: boolean;
  imovelFechado: boolean;
  visitaRecusada: boolean;
  visitaConcluida: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private toastController: ToastController,
    private vistoriaService: VistoriaService,
    private imovelService: ImovelService,
    private depositoService: DepositoService,
    private authenticationService: AuthenticationService,
    private depositoVistoriaService: DepositoVistoriaService) {
    this.edit = false;
    this.vistoriaForm = this.criarVistoriaForm();
    this.mostrarDepositos = true;
    this.imovelFechado = false;
    this.visitaRecusada = false;
    this.visitaConcluida = false;
    this.imoveis = [];
    this.depositos = [];
    this.depositosSelecionados = [];
    this.depositosVistoria = [];
  }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.listarTodosImoveis();
    this.listarTodosDepositos();
    this.listarVistoria();
    this.obterUsuarioLogado();
  }

  salvar() {
    let vistoria = this.preencherVistoriaModel(this.vistoriaForm.value);
    if (this.edit) {
      this.alterarVistoria(vistoria);
    } else {
      this.adicionarVistoria(vistoria);
    }
  }

  cancelar() {
    this.vistoriaForm.reset();
    this.voltarLista();
  }

  remover() {
    this.vistoriaService.removerVistoria(this.id).subscribe(
      el => {
        this.mostrarToast("Visita removida com sucesso", "sucesso");
        this.voltarLista();
      }, err => {
        this.mostrarToast("Não foi possível remover a visita", "erro");
      }
    )
  }


  mostrarListaDepositos(){
    if(this.imovelFechado || this.visitaRecusada){
      this.mostrarDepositos = false;
      this.removerValidacaoDepositosFormulario();
    } else {
      this.mostrarDepositos = true;
      this.adicionarValidacaoDepositosFormulario();
    }
  }

  compareWith(d1: DepositoModel, d2: DepositoModel | DepositoModel[]) {
    if (!d1 || !d2) {
      return d1 === d2;
    }

    if (Array.isArray(d2)) {
      return d2.some((d: DepositoModel) => d.id === d1.id);
    }

    return d1.id === d2.id;
  }

  private removerValidacaoDepositosFormulario() {
    let depositoControl = this.vistoriaForm.get('deposito');
    depositoControl.clearValidators();
    depositoControl.updateValueAndValidity();
  }

  private adicionarValidacaoDepositosFormulario() {
    let depositoControl = this.vistoriaForm.get('deposito');
    depositoControl.setValidators([Validators.required]);
    depositoControl.updateValueAndValidity();
  }

  private listarTodosDepositos() {
    this.depositoService.listarDepositos().subscribe(depositos => this.depositos = depositos);
  }

  private listarTodosImoveis() {
    this.imovelService.listarImoveis().subscribe(imoveis => this.imoveis = imoveis);
  }

  private obterUsuarioLogado() {
    this.usuarioLogado = this.authenticationService.getUsuario();
  }

  private voltarLista() {
    this.router.navigateByUrl('vistorias', { skipLocationChange: true }).then(() => {
      this.router.navigate(['vistorias'])
    });
  }

  private alterarVistoria(vistoria: VistoriaModel) {
    vistoria.id = this.id;
    this.vistoriaService.alterarVistoria(vistoria)
      .subscribe(
        el => {
          this.depositoVistoriaService.removerDepositoVistoria(this.id).subscribe(dp => {
            let depositosVistoria = this.preencherDepositosVistoriaModel(el);
            this.depositoVistoriaService.adicionarDepositosVistoria(depositosVistoria).subscribe(
              el =>{
                this.mostrarToast("Visita alterada com sucesso", "sucesso");
                this.voltarLista();
              },
              err => {
                this.mostrarToast("Não foi possível adicionar os depósitos inspecionados a visita", "erro");
              }
            );
          })
        },
        err => {
          this.mostrarToast("Não foi possível alterar a vistoria", "erro");
        },
      );
  }

  private adicionarVistoria(vistoria: VistoriaModel) {
    this.vistoriaService.adicionarVistoria(vistoria)
      .subscribe(
        el => {
          let depositosVistoria = this.preencherDepositosVistoriaModel(el);
          this.depositoVistoriaService.adicionarDepositosVistoria(depositosVistoria).subscribe(
            el =>{
              this.mostrarToast("Visita adicionada com sucesso", "sucesso");
              this.voltarLista();
            },
            err => {
              this.mostrarToast("Não foi possível adicionar os depósitos inspecionados a visita", "erro");
            }
          );
        },
        err => {
          this.mostrarToast("Não foi possível adicionar a visita", "erro");
        },
      );
  }


  private preencherVistoriaModel(vistoriaFormValue: any) {
    this.formatarData();
    let vistoria = new VistoriaModel();
    vistoria.codigoAtividade = vistoriaFormValue.codigoAtividade;
    vistoria.concluida = vistoriaFormValue.concluida;
    vistoria.dataVistoria = this.formatarData();
    vistoria.imovelFechado = vistoriaFormValue.imovelFechado;
    vistoria.imovelId = vistoriaFormValue.imovel;
    vistoria.recusada = vistoriaFormValue.recusada;
    vistoria.tipo = Number(vistoriaFormValue.tipo);
    vistoria.tipoVisita = vistoriaFormValue.tipoVisita;
    vistoria.usuarioId = this.usuarioLogado.id;
    return vistoria;
  }

  private preencherDepositosVistoriaModel(vistoria: VistoriaModel): DepositoVistoriaModel[]{
    let depositos = this.vistoriaForm.get('deposito').value;
    let depositosVistoria: DepositoVistoriaModel[] =  [];
    for (let deposito of depositos) {
      let depositoVistoria = new DepositoVistoriaModel();
      depositoVistoria.depositoId = deposito.id;
      depositoVistoria.vistoriaId = vistoria.id;
      depositosVistoria.push(depositoVistoria);
    }
    return depositosVistoria;
  }

  private listarVistoria(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      this.edit = true;
      this.id = Number(idParam);
      this.vistoriaService.listarVistoriaById(this.id)
        .subscribe(
          el => {
            this.depositoVistoriaService.listarDepositoVistoriaByVistoriaId(this.id).subscribe(
              dv => {
                this.preencherFormulario(el, dv);
              }, err => {
                if(err.status == 404){
                  let depositosVistoria: DepositoVistoriaModel[] = [];
                  this.preencherFormulario(el, depositosVistoria);
                }
                this.mostrarToast("Não foi possível pesquisar os depósitos inspecionados na visita", "erro");
              }
            );
          },
          err => {
            this.mostrarToast("Não foi possível pesquisar a visita", "erro");
          },
        );
    }
  }

  private criarVistoriaForm() {
    return this.formBuilder.group({
      deposito:  ['', ''],
      dataVistoria: [{value: '', disabled: true}, ''],
      codigoAtividade: ['', Validators.compose([Validators.required, Validators.maxLength(6)])],
      concluida: [false, ''],
      imovelFechado: [false, ''],
      imovel: ['', Validators.compose([Validators.required])],
      recusada: [false, ''],
      tipo: ['', Validators.compose([Validators.required])],
      tipoVisita: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(11)])],
    });
  }

  private preencherDepositoSelecionados(depositosVistoria: DepositoVistoriaModel[]) {
    for (let depositoVistoria of depositosVistoria) {
      this.depositosSelecionados.push(depositoVistoria.deposito);
    }
  }

  private preencherFormulario(vistoria: VistoriaModel, depositosVistoria: DepositoVistoriaModel[]) {
    var dataVistoria = this.datePipe.transform(vistoria.dataVistoria, "dd/MM/yyyy");

    if (!vistoria.imovelFechado && !vistoria.recusada) {
      this.mostrarDepositos = true;
      this.preencherDepositoSelecionados(depositosVistoria);
    }

    this.vistoriaForm.setValue({
      codigoAtividade: vistoria.codigoAtividade,
      concluida: vistoria.concluida,
      dataVistoria: dataVistoria,
      imovelFechado: vistoria.imovelFechado,
      imovel: vistoria.imovel.id,
      recusada: vistoria.recusada,
      tipo: String(vistoria.tipo),
      tipoVisita: vistoria.tipoVisita,
      deposito: this.depositosSelecionados
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

  private formatarData():number {
    let dataVistoria = new Date();
    dataVistoria.setHours(0, 0, 0, 0);
    return dataVistoria.getTime();
  }
}