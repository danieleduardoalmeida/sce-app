import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AnaliseModel } from 'src/app/model/analise.model';
import { AnaliseService } from 'src/app/service/analise.service';

@Component({
  selector: 'app-analises',
  templateUrl: './analises.entrada.page.html',
  styleUrls: ['./analises.entrada.page.scss'],
})

export class AnalisesEntradaPage implements OnInit {
  ;
analises: AnaliseModel[]
  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private analiseService: AnaliseService) {
      this.analises = [];
    }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarTodos();
  }

  alterar(id: string) {
    this.router.navigate(['/analiseEntrada', id]);
  }

  adicionar() {
    this.router.navigate(['/analiseEntrada']);
  }

  private listarTodos() {
    this.analiseService.listarAnalisesAbertas().subscribe(analises => this.formatarDataEntrada(analises));
  }

  private formatarDataEntrada(analises: AnaliseModel[]){
    this.analises = [];
    for (let analise of analises) {
      console.log(analise.dataEntrada);
      analise.dataEntradaFormatada = this.datePipe.transform(analise.dataEntrada, "dd/MM/yyyy");
      console.log(analise.dataEntradaFormatada)
      this.analises.push(analise);
    }
  }
}