import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DepositoVistoriaModel } from 'src/app/model/deposito.vistoria.model';
import { DepositoModel } from 'src/app/model/deposito.model';
import { VistoriaModel } from 'src/app/model/vistoria.model';
import { AnaliseModel } from 'src/app/model/analise.model';
import { AmostraModel } from 'src/app/model/amostra.model';
import { VistoriaService } from 'src/app/service/vistoria.service';
import { AnaliseService } from 'src/app/service/analise.service';
import { AmostraService } from 'src/app/service/amostra.service';
import { DepositoVistoriaService } from 'src/app/service/deposito.vistoria.service';


@Component({
  selector: 'app-amostra',
  templateUrl: './amostra.page.html',
  styleUrls: ['./amostra.page.scss'],
})

export class AmostraPage implements OnInit {
  amostraForm: FormGroup;
  edit: boolean;
  id: number;
  depositos: DepositoModel[];
  vistorias: VistoriaModel[];
  analises: AnaliseModel[];
  mostrarDepositos: boolean;
  mostrarAnalises: boolean;
  
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private vistoriaService: VistoriaService,
    private analiseService: AnaliseService,
    private depositoVistoriaService: DepositoVistoriaService,
    private amostraService: AmostraService) {
      this.mostrarDepositos = false;
      this.mostrarAnalises = false;
      this.depositos = [];
      this.vistorias = [];
      this.analises = [];
      this.amostraForm = this.criarAmostraForm();
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarVistorias();
    this.listarAmostra();
  }
  
  cancelar() {
    this.amostraForm.reset();
    this.voltarLista();
  }

  salvar() {
    let amostra = this.preencherAmostraModel(this.amostraForm.value);
    if (this.edit) {
      this.alterar(amostra);
    } else {
      this.adicionar(amostra);
    }
  }

  remover() {
    this.amostraService.removerAmostra(this.id)
    .subscribe(
      el => {
        this.mostrarToast("Amostra removida com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível remover a amostra", "erro");
      },
    );
  }

  selecionarVistoria($event) {
    if($event.detail.value){
      this.listraDepositosVistoriaId($event.detail.value);
      this.listarAnalisesVistoriaId($event.detail.value);
    }
  }

  listraDepositosVistoriaId(id: any){
    this.depositoVistoriaService.listarDepositoVistoriaByVistoriaId(id).subscribe(
      el => {
        this.mostrarDepositos = true;
        this.preencherDepositos(el);
      },
      err => {
        this.mostrarToast("Não foi possível listar os depósitos", "erro");
      },
    );
  }

  listarAnalisesVistoriaId(id: any){
    this.analiseService.listarAnaliseByVistoriaId(id).subscribe(
      el => {
        this.mostrarAnalises = true;
        this.formatarDataEntradaAnalise(el);
      },
      err => {
        this.mostrarToast("Não foi possível listar as análises", "erro");
      },
    );
  }

  private listarAmostra(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      this.edit = true;
      this.id = Number(idParam);
      this.amostraService.listarAmostraById(this.id)
        .subscribe(
          el => {
            this.preencherFormulario(el);
          },
          err => {
            this.mostrarToast("Não foi possível pesquisar a amostra", "erro");
          },
        );
    }
  }
  private formatarDataEntradaAnalise(analises: AnaliseModel[]){
    this.analises = [];
    for (let analise of analises) {
      analise.dataEntradaFormatada = this.datePipe.transform(analise.dataEntrada,"dd-MM-yyyy");
      this.analises.push(analise);
    }
  }

  private preencherFormulario(amostra: any) {
    console.log(amostra);
    this.amostraForm.setValue(
      { 
        deposito: amostra.depositoId, 
        vistoria: amostra.vistoria.id,
        analise: amostra.analiseId,
        tipo: amostra.tipo,
        quantidadeTubitos: amostra.quantidadeTubitos
      });
  }

  private alterar(amostra: AmostraModel) {
    amostra.id = this.id;
    this.amostraService.alterarAmostra(amostra)
      .subscribe(
        el => {
          this.mostrarToast("Amostra alterada com sucesso", "sucesso");
          this.voltarLista();
        },
        err => {
          this.mostrarToast("Não foi possível alterar a amostra", "erro");
        },
      );
  }

  private adicionar(amostra: AmostraModel) {
    this.amostraService.adicionarAmostra(amostra)
      .subscribe(
        el => {
          this.mostrarToast("Amostra adicionada com sucesso", "sucesso");
          this.voltarLista();
        },
        err => {
          this.mostrarToast("Não foi possível adicionar a amostra", "erro");
        },
      );
  }

  private preencherDepositos(depositoVistorias: DepositoVistoriaModel[]){
    for (let depositoVistoria of depositoVistorias) {
      this.depositos.push(depositoVistoria.deposito);
    }
  }

  private voltarLista() {
    this.router.navigateByUrl('amostras', { skipLocationChange: true }).then(() => {
      this.router.navigate(['amostras'])
    });
  }

  private preencherAmostraModel(amostraFormValue: any) {
    let amostra = new AmostraModel();
    amostra.vistoriaId = amostraFormValue.vistoria;
    amostra.depositoId = amostraFormValue.deposito;
    amostra.analiseId = amostraFormValue.analise;
    amostra.tipo = amostraFormValue.tipo;
    amostra.quantidadeTubitos = amostraFormValue.quantidadeTubitos;
    return amostra;
  }

  private criarAmostraForm() {
    return this.formBuilder.group({
      vistoria:  ['', Validators.compose([Validators.required])],
      deposito: ['', Validators.compose([Validators.required])],
      analise: ['', Validators.compose([Validators.required])],
      quantidadeTubitos: ['', Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
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