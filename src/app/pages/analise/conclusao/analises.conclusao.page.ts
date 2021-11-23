import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AnaliseModel } from 'src/app/model/analise.model';
import { AnaliseService } from 'src/app/service/analise.service';


@Component({
  selector: 'app-analises',
  templateUrl: './analises.conclusao.page.html',
  styleUrls: ['./analises.conclusao.page.scss'],
})

export class AnalisesConclusaoPage implements OnInit {
  analises: AnaliseModel[];

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    public toastController: ToastController,
    private analiseService: AnaliseService) {
      this.analises = [];
    }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarTodos();
  }

  alterar(id: string) {
    this.router.navigate(['/analiseConclusao', id]);
  }

  private listarTodos() {
    this.analiseService.listarAnalises().subscribe(analises => this.formatarDataEntrada(analises));
  }

  private formatarDataEntrada(analises: AnaliseModel[]){
    this.analises = [];
    for (let analise of analises) {
      analise.dataEntradaFormatada = this.datePipe.transform(analise.dataEntrada,"dd-MM-yyyy");
      analise.dataConclusaoFormatada = this.datePipe.transform(analise.dataConclusao,"dd-MM-yyyy");
      this.analises.push(analise);
    }
  }
}