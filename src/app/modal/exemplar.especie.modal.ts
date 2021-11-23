import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ExemplarModel } from 'src/app/model/exemplar.model';
import { ExemplarAnaliseEspecieModel } from '../model/exemplar.analise.especie.model';
import { ExemplarService } from 'src/app/service/exemplar.service';

@Component({
    selector: 'app-exemplar',
    templateUrl: './exemplar.especie.modal.html',
    styleUrls: ['./exemplar.especie.modal.scss']
})
export class ExemplarEspecieModal implements OnInit {
    exemplarEspecieForm: FormGroup;
    exemplares: ExemplarModel[];
    exemplarEspecieSelecionado: ExemplarAnaliseEspecieModel;

    @Input() especieId: number;

    constructor(private modalController: ModalController,
        private formBuilder: FormBuilder,
        private exemplarService: ExemplarService) {
        this.exemplarEspecieForm = this.criarExemplarEspecieForm();
        this.exemplarEspecieSelecionado = new ExemplarAnaliseEspecieModel();
        this.exemplares = [];
    }

    ngOnInit() {
        this.listarExemplares();
    }

    selecionarExemplar($event) {
        this.exemplarEspecieSelecionado.exemplarId = $event.target.value.id;
        this.exemplarEspecieSelecionado.especieId = this.especieId;
    }

    async associarExemplarEspecie(){
        this.exemplarEspecieSelecionado.quantidade = this.exemplarEspecieForm.value.quantidade;
        await this.modalController.dismiss(this.exemplarEspecieSelecionado);
    }

    async closeModal() {
      await this.modalController.dismiss();
    }

    private criarExemplarEspecieForm() {
        return this.formBuilder.group({
            exemplar: ['', Validators.compose([Validators.required])],
            quantidade: ['', Validators.compose([Validators.required])]
        });
    }

    private listarExemplares() {
        this.exemplarService.listarExemplares().subscribe(exemplares => this.exemplares = exemplares);
    }
}