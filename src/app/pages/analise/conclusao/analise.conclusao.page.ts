import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { concatMap, tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ExemplarEspecieModal } from 'src/app/modal/exemplar.especie.modal';
import { AnaliseModel } from 'src/app/model/analise.model';
import { AnaliseEspecieModel } from 'src/app/model/analise.especie.model';
import { ExemplarAnaliseEspecieModel } from 'src/app/model/exemplar.analise.especie.model';
import { EspecieModel } from 'src/app/model/especie.model';
import { AnaliseService } from 'src/app/service/analise.service';
import { EspecieService } from 'src/app/service/especie.service';
import { ExemplarAnaliseEspecieService } from 'src/app/service/exemplar.analise.service';
import { AnaliseEspecieService } from 'src/app/service/analise.especie.service';


@Component({
  selector: 'app-analise',
  templateUrl: './analise.conclusao.page.html',
  styleUrls: ['./analise.conclusao.page.scss'],
})

export class AnaliseConclusaoPage implements OnInit {
  analiseConclusaoForm: FormGroup;
  edit: boolean;
  especies: EspecieModel[];
  especiesSelecionadas: EspecieModel[];
  id: number;
  exemplarEspecieSelecionado: ExemplarAnaliseEspecieModel;
  exemplaresEspecieSelecionado: ExemplarAnaliseEspecieModel[];
  analise: AnaliseModel;
  falhas: boolean[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private modalController: ModalController,
    private analiseService: AnaliseService,
    private especieService: EspecieService,
    private analiseEspecieService: AnaliseEspecieService,
    private exemplarAnaliseEspecieService: ExemplarAnaliseEspecieService) {
    this.edit = false;
    this.especies = [];
    this.falhas = [];
    this.especiesSelecionadas = [];
    this.exemplaresEspecieSelecionado = [];
    this.analiseConclusaoForm = this.criarAnaliseForm();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listarEspecies();
    this.listarAnalise();
  }

  remover() {
    let falhas: boolean[] = [];
    this.removerAssociacoesAnalise().subscribe(
      next => falhas.push(false),
      error => falhas.push(true)
    )
    if(falhas.some(falha => falha === true)){
      this.mostrarToast("Não foi possível remover a conclusão da análise","erro" );
    } else {
      this.removerAnaliseConclusao();
    }
  }

  salvar() {
    this.analise.dataConclusao = this.formatarData();
    this.alterar(this.analise);
    this.voltarLista();
  }

  cancelar() {
    this.analiseConclusaoForm.reset();
    this.voltarLista();
  }

  compareWith(e1: EspecieModel, e2: EspecieModel | EspecieModel[]) {
    if (!e1 || !e2) {
      return e1 === e2;
    }

    if (Array.isArray(e2)) {
      return e2.some((e: EspecieModel) => e.id === e1.id);
    }

    return e1.id === e2.id;
  }

  async selecionarEspecie($event) {
    const checkboxArrayList: FormArray = this.analiseConclusaoForm.get('especie') as FormArray;
    this.atualizarCheckBoxControl(checkboxArrayList, $event.target);
    if ($event.detail.checked) {
      this.especiesSelecionadas.push($event.detail.value);
      this.mostrarModal($event.detail.value.id);
    } else {
      this.removerEspecieListaEspecieSelecionada($event.detail.value.id);
      this.removerExemplarEspecieListaExemplarEspecieSelecionada($event.detail.value.id);
    }
  }

  private removerAssociacoesAnalise(): Observable<any[]> {
    let response1 = this.analiseEspecieService.removerAnaliseEspecie(this.id);
    let response2 = this.exemplarAnaliseEspecieService.removerExemplarAnalise(this.id);
    return forkJoin([response1, response2]);
  }

  private listarAnalise(): void {
    let idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null && idParam !== undefined) {
      this.edit = true;
      this.id = Number(idParam);
      this.analiseService.listarAnaliseById(this.id)
        .subscribe(
          el => {
            this.analise = el;
            this.buscarAnaliseEspecie(this.id)
          },
          err => {
            this.mostrarToast("Não foi possível pesquisar a análise", "erro");
          },
        );
    }
  }

  private removerExemplarEspecieListaExemplarEspecieSelecionada(id: number) {
    const exemplarEspecieIndex = this.exemplaresEspecieSelecionado.findIndex(obj => obj.especieId === id);
    if (exemplarEspecieIndex > -1) {
      this.exemplaresEspecieSelecionado.splice(exemplarEspecieIndex, 1);
    }
  }

  private removerEspecieListaEspecieSelecionada(id: number) {
    const especieIndex = this.especiesSelecionadas.findIndex(obj => obj.id === id);
    if (especieIndex > -1) {
      this.especiesSelecionadas.splice(especieIndex, 1);
    }
  }

  private removerAnaliseConclusao(){
    this.analise.dataConclusao = null;
    this.analiseService.alterarAnalise(this.analise).subscribe(
      el => {
        this.mostrarToast("A conclusão da análise foi removida com sucesso", "sucesso");
      },
      err => {
        this.mostrarToast("Não foi possível remover a conclusão da análise", "erro");
      },
    );
    this.voltarLista();
  }

  private alterar(analise: AnaliseModel) {
    let analisesEspecie = this.preencherAnaliseEspecieModel(analise);
    let exemplaresAnaliseEspecieModel = this.preencherExemplarAnaliseEspecieModel(analise);
    analise.dataConclusao = new Date().getTime();
    this.analiseEspecieService.removerAnaliseEspecie(analise.id)
      .pipe(
        tap(res => this.falhas.push(false),
          err => {
            this.falhas.push(true)
          }),
        concatMap(() => this.exemplarAnaliseEspecieService.removerExemplarAnalise(analise.id)),
        tap(res => this.falhas.push(false),
          err => {
            this.falhas.push(true)
          }),
        concatMap(() => this.analiseEspecieService.adicionarAnalisesEspecie(analisesEspecie)),
        tap(res => this.falhas.push(false),
          err => {
            this.falhas.push(true)
          }),
        concatMap(() => this.exemplarAnaliseEspecieService.adicionarExemplaresAnalise(exemplaresAnaliseEspecieModel)),
        tap(res => this.falhas.push(false),
          err => {
            this.falhas.push(true)
          }),
        concatMap(() => this.analiseService.alterarAnalise(analise)),
        tap(res => this.falhas.push(false),
          err => {
            this.falhas.push(true)
          })
      )
      .subscribe();
    this.concluirAnalise();
  }

  private concluirAnalise() {
    if (this.falhas.some(code => code === true)) {
      this.mostrarToast("Não foi possível concluir a análise", "erro");
    } else {
      this.mostrarToast("Análise concluída com sucesso", "sucesso");
    }
  }

  private preencherAnaliseEspecieModel(analise: AnaliseModel): AnaliseEspecieModel[] {
    let analisesEspecie: AnaliseEspecieModel[] = [];
    for (let especie of this.especiesSelecionadas) {
      let analiseEspecie = new AnaliseEspecieModel();
      analiseEspecie.analiseId = analise.id;
      analiseEspecie.especieId = especie.id;
      analisesEspecie.push(analiseEspecie);
    }
    return analisesEspecie;
  }

  private preencherExemplarAnaliseEspecieModel(analise: AnaliseModel): ExemplarAnaliseEspecieModel[] {
    let exemplaresAnaliseEspecieModel: ExemplarAnaliseEspecieModel[] = [];
    for (let exemplar of this.exemplaresEspecieSelecionado) {
      let exemplarAnaliseEspecieModel = new ExemplarAnaliseEspecieModel();
      exemplarAnaliseEspecieModel.analiseId = analise.id;
      exemplarAnaliseEspecieModel.exemplarId = exemplar.exemplarId;
      exemplarAnaliseEspecieModel.especieId = exemplar.especieId;
      exemplarAnaliseEspecieModel.quantidade = exemplar.quantidade;
      exemplaresAnaliseEspecieModel.push(exemplarAnaliseEspecieModel);
    }
    return exemplaresAnaliseEspecieModel;
  }

  private async mostrarModal(id: number) {
    const modal = await this.modalController.create({
      component: ExemplarEspecieModal,
      componentProps: {
        'especieId': id
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      this.exemplarEspecieSelecionado = dataReturned.data;
      if (this.exemplarEspecieSelecionado) {
        this.exemplaresEspecieSelecionado.push(this.exemplarEspecieSelecionado);
      }
    });

    await modal.present();
  }

  private listarEspecies() {
    this.especieService.listarEspecies().subscribe(especies => this.especies = this.inicializarListaEspecie(especies));
  }

  private voltarLista() {
    this.router.navigateByUrl('analisesConclusao', { skipLocationChange: true }).then(() => {
      this.router.navigate(['analisesConclusao'])
    });
  }

  private buscarAnaliseEspecie(id: number): void {
    this.analiseEspecieService.listarAnalisesEspecieByAnaliseId(this.id)
      .subscribe(
        el => {
          this.preencherFormulario(el)
        },
        err => {
          this.mostrarToast("Não foi possível pesquisar a análise", "erro");
        },
      );
  }

  private selecionarCheckBox() {
    const especiesCheckBox: FormArray = this.analiseConclusaoForm.get('especie') as FormArray;
    this.especies.forEach(o => {
      this.atualizarCheckBoxControl(especiesCheckBox, o);
      this.analiseConclusaoForm.controls['especie'].setErrors(null);
    })
    this.analiseConclusaoForm.controls.especie.updateValueAndValidity({ emitEvent: false })
  }

  private atualizarCheckBoxControl(cal, o) {
    if (o.checked) {
      cal.push(new FormControl(o.value));
    } else {
      cal.controls.forEach((item: FormControl, index) => {
        if (item.value == o.value) {
          cal.removeAt(index);
          return;
        }
      });
    }
  }

  private criarAnaliseForm() {
    return this.formBuilder.group({
      especie: this.formBuilder.array([], [Validators.required])
    });
  }

  private preencherFormulario(analisesEspecie: AnaliseEspecieModel[]) {
    this.especies.map(especie => {
      if (analisesEspecie.some(analise => analise.especie.id == especie.id)) {
        especie.especieSelecionada = true;
      }
      return especie;
    })
    this.selecionarCheckBox();
  }

  private inicializarListaEspecie(especies: EspecieModel[]) {
    especies.map(especie => {
      especie.especieSelecionada = false;
      return especie;
    })
    return especies;
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