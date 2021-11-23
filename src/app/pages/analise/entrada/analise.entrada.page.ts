import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AnaliseModel } from 'src/app/model/analise.model';
import { VistoriaModel } from 'src/app/model/vistoria.model';
import { AnaliseService } from 'src/app/service/analise.service';
import { VistoriaService } from 'src/app/service/vistoria.service';


@Component({
  selector: 'app-analise',
  templateUrl: './analise.entrada.page.html',
  styleUrls: ['./analise.entrada.page.scss'],
})

export class AnaliseEntradaPage implements OnInit {
  analiseEntradaForm: FormGroup;
  edit: boolean;
  id: number;
  vistorias: VistoriaModel[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private toastController: ToastController,
    private analiseService: AnaliseService,
    private vistoriaService: VistoriaService) {
    this.edit = false;
    this.vistorias = [];
    this.analiseEntradaForm = this.criarAnaliseForm();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.listarVistorias();
    this.listarAnalise();
  }

  salvar() {
    let analise = this.preencherAnaliseModel(this.analiseEntradaForm.value);
    if (this.edit) {
      this.alterar(analise);
    } else {
      this.adicionar(analise);
    }
  }

  remover() {
    this.analiseService.removerAnalise(this.id).subscribe(
      el => {
        this.mostrarToast("Entrada de análise removida com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível remover a entrada de análise", "erro");
      },
    );
  }

  cancelar() {
    this.analiseEntradaForm.reset();
    this.voltarLista();
  }

  private voltarLista() {
    this.router.navigateByUrl('analisesEntrada', { skipLocationChange: true }).then(() => {
      this.router.navigate(['analisesEntrada'])
    });
  }

  private alterar(analise: AnaliseModel) {
    analise.id = this.id;
    this.analiseService.alterarAnalise(analise)
    .subscribe(
      el => {
        this.mostrarToast("Análise alterada com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível alterar a análise", "erro");
      },
    );
  }

  private adicionar(analise: AnaliseModel) {
    this.analiseService.adicionarAnalise(analise)
    .subscribe(
      el => {
        this.mostrarToast("Análise adicionada com sucesso", "sucesso");
        this.voltarLista();
      },
      err => {
        this.mostrarToast("Não foi possível adicionar a análise", "erro");
      },
    );
  }

  private preencherAnaliseModel(analiseFormValue: any) {
    let analise = new AnaliseModel();
    analise.laboratorio = analiseFormValue.laboratorio;
    analise.laboratorista = analiseFormValue.laboratorista;
    analise.dataEntrada = this.formatarData();
    analise.vistoriaId = analiseFormValue.vistoria;
    return analise;
  }

  private listarAnalise(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      this.edit = true;
      this.id = Number(idParam);
      this.analiseService.listarAnaliseById(this.id)
      .subscribe(
        el => {
          this.preencherFormulario(el);
        },
        err => {
          this.mostrarToast("Não foi possível pesquisar a análise", "erro");
        },
      );
    } 
  }

  private criarAnaliseForm() {
    return this.formBuilder.group({
      vistoria:  ['', Validators.compose([Validators.required])],
      dataEntrada: [{value: '', disabled: true}, ''],
      laboratorio: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      laboratorista: ['', Validators.compose([Validators.required, Validators.maxLength(255)])]
    });
  }

  private preencherFormulario(analise: AnaliseModel) {
    var dataEntrada = this.datePipe.transform(analise.dataEntrada, "dd/MM/yyyy");
    this.analiseEntradaForm.setValue({
      dataEntrada: dataEntrada,
      laboratorista: analise.laboratorista,
      laboratorio: analise.laboratorio,
      vistoria: analise.vistoriaId
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

  private formatarData():number {
    let dataVistoria = new Date();
    dataVistoria.setHours(0, 0, 0, 0);
    return dataVistoria.getTime();
  }
}