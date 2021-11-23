import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {formatDate } from '@angular/common';
import { VistoriaModel } from 'src/app/model/vistoria.model';
import { VistoriaService } from 'src/app/service/vistoria.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
})

export class RelatoriosPage implements OnInit {
  relatoriosForm: FormGroup;
  vistorias: VistoriaModel[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vistoriaService: VistoriaService) {
      this.relatoriosForm = this.criarRelatorisForm();
      this.vistorias = [];
    }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarVistorias();
  }

  public gerarRelatorio(){
    let relatoriosFormValue = this.relatoriosForm.value;
    let dataVistoria = formatDate(relatoriosFormValue.dataVistoria, 'yyyy-MM-dd', 'en-US');;
    this.router.navigate(['/relatorio', relatoriosFormValue.vistoria, dataVistoria]);
  }

  private listarVistorias() {
    this.vistoriaService.listarVistorias().subscribe(vistorias => 
      this.vistorias = vistorias
      );
  }

  private criarRelatorisForm() {
    return this.formBuilder.group({
      vistoria:  ['', Validators.compose([Validators.required])],
      dataVistoria: ['', Validators.compose([Validators.required])]
    });
  }

}