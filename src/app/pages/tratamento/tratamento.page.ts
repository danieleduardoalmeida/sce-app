import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { TratamentoModel } from 'src/app/model/tratamento.model';
import { DepositoModel } from 'src/app/model/deposito.model';
import { VistoriaModel } from 'src/app/model/vistoria.model';
import { DepositoVistoriaService } from 'src/app/service/deposito.vistoria.service';
import { VistoriaService } from 'src/app/service/vistoria.service';
import { TratamentoService } from 'src/app/service/tratamento.service';
import { DepositoVistoriaModel } from 'src/app/model/deposito.vistoria.model';


@Component({
  selector: 'app-tratamento',
  templateUrl: './tratamento.page.html',
  styleUrls: ['./tratamento.page.scss'],
})

export class TratamentoPage implements OnInit {
  tratamentoForm: FormGroup;
  edit: boolean;
  id: number;
  depositos: DepositoModel[];
  vistorias: VistoriaModel[];
  mostrarDepositos: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private vistoriaService: VistoriaService,
    private depositoVistoriaService: DepositoVistoriaService,
    private tratamentoService: TratamentoService) {
      this.mostrarDepositos = false;
      this.depositos = [];
      this.vistorias = [];
      this.tratamentoForm = this.criarTratamentoForm();
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarVistorias();
    this.listarTratamento();
  }
  
  cancelar() {
    this.tratamentoForm.reset();
    this.voltarLista();
  }

  salvar() {
    let tratamento = this.preencherTratamentoModel(this.tratamentoForm.value);
    if (this.edit) {
      this.alterar(tratamento);
    } else {
      this.adicionar(tratamento);
    }
  }

  remover() {
    this.tratamentoService.removerTratamento(this.id)
    .subscribe(
      el => {
        this.mostrarToast("Tratamento removido com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível remover o tratamento", "erro");
      },
    );
  }

  selecionarVistoria($event) {
    if($event.detail.value){
      this.depositoVistoriaService.listarDepositoVistoriaByVistoriaId($event.detail.value).subscribe(
        el => {
          this.mostrarDepositos = true;
          this.preencherDepositos(el);
        },
        err => {
          this.mostrarToast("Não foi possível listar os depósitos", "erro");
        },
      );
    }
  }

  private listarTratamento(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      this.edit = true;
      this.id = Number(idParam);
      this.tratamentoService.listarTratamentoById(this.id)
        .subscribe(
          el => {
            this.preencherFormulario(el);
          },
          err => {
            this.mostrarToast("Não foi possível pesquisar o tratamento", "erro");
          },
        );
    }
  }

  private preencherFormulario(tratamento: any) {
    this.tratamentoForm.setValue(
      { 
        deposito: tratamento.deposito.id, 
        quantidadeAdulticida: tratamento.quantidadeCargasAdulticida, 
        quantidadeDepositos: tratamento.quantidadeDepositosEliminados,
        quantidadeLarvicida1: tratamento.quantidadeLarvicida1,
        quantidadeLarvicida2: tratamento.quantidadeLarvicida2,
        adulticida: tratamento.tipoAdulticida,
        larvicida1: tratamento.tipoLarvicida1,
        larvicida2: tratamento.tipoLarvicida2,
        quantidadeDepositosLarvicida1: tratamento.quantidadeDepositosLarvicida1,
        quantidadeDepositosLarvicida2: tratamento.quantidadeDepositosLarvicida2,
        vistoria: tratamento.vistoria.id
      });
  }

  private alterar(tratamento: TratamentoModel) {
    tratamento.id = this.id;
    this.tratamentoService.alterarTratamento(tratamento)
      .subscribe(
        el => {
          this.mostrarToast("Tratamento alterado com sucesso", "sucesso");
          this.voltarLista();
        },
        err => {
          this.mostrarToast("Não foi possível alterar o tratamento", "erro");
        },
      );
  }

  private adicionar(tratamento: TratamentoModel) {
    this.tratamentoService.adicionarTratamento(tratamento)
      .subscribe(
        el => {
          this.mostrarToast("Tratamento adicionado com sucesso", "sucesso");
          this.voltarLista();
        },
        err => {
          this.mostrarToast("Não foi possível adicionar o tratamento", "erro");
        },
      );
  }

  private preencherDepositos(depositoVistorias: DepositoVistoriaModel[]){
    for (let depositoVistoria of depositoVistorias) {
      this.depositos.push(depositoVistoria.deposito);
    }
  }

  private voltarLista() {
    this.router.navigateByUrl('tratamentos', { skipLocationChange: true }).then(() => {
      this.router.navigate(['tratamentos'])
    });
  }

  private preencherTratamentoModel(tratamentoFormValue: any) {
    let tratamento = new TratamentoModel();
    tratamento.vistoriaId = tratamentoFormValue.vistoria;
    tratamento.depositoId = tratamentoFormValue.deposito;
    tratamento.quantidadeCargasAdulticida = tratamentoFormValue.quantidadeAdulticida;
    tratamento.quantidadeDepositosEliminados = tratamentoFormValue.quantidadeDepositos;
    tratamento.quantidadeLarvicida1 = tratamentoFormValue.quantidadeLarvicida1;
    tratamento.quantidadeLarvicida2 = tratamentoFormValue.quantidadeLarvicida2;
    tratamento.tipoAdulticida = tratamentoFormValue.adulticida;
    tratamento.tipoLarvicida1 = tratamentoFormValue.larvicida1;
    tratamento.tipoLarvicida2 = tratamentoFormValue.larvicida2;
    tratamento.quantidadeDepositosLarvicida1 = tratamentoFormValue.quantidadeDepositosLarvicida1;
    tratamento.quantidadeDepositosLarvicida2 = tratamentoFormValue.quantidadeDepositosLarvicida2;
    return tratamento;
  }

  private criarTratamentoForm() {
    return this.formBuilder.group({
      vistoria:  ['', Validators.compose([Validators.required])],
      deposito: ['', Validators.compose([Validators.required])],
      quantidadeDepositos: ['', Validators.compose([Validators.required])],
      larvicida1: ['', ''],
      quantidadeLarvicida1: ['', ''],
      quantidadeDepositosLarvicida1: ['', ''],
      larvicida2: ['', ''],
      quantidadeLarvicida2: ['', ''],
      quantidadeDepositosLarvicida2: ['', ''],
      adulticida: ['', ''],
      quantidadeAdulticida: ['', '']
    });
  }

  private listarVistorias() {
    this.vistoriaService.listarVistorias().subscribe(vistorias => this.vistorias = vistorias);
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