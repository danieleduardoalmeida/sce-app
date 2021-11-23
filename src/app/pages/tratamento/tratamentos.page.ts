import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TratamentoModel } from 'src/app/model/tratamento.model';
import { TratamentoService } from 'src/app/service/tratamento.service';

@Component({
  selector: 'app-tratamentos',
  templateUrl: './tratamentos.page.html',
  styleUrls: ['./tratamentos.page.scss'],
})

export class TratamentosPage implements OnInit {
  tratamentos: TratamentoModel[];

  constructor(
    private router: Router,
    private tratamentoService: TratamentoService) {
      this.tratamentos = [];
    }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarTodos();
  }

  alterar(id: string) {
    this.router.navigate(['/tratamento', id]);
  }

  adicionar() {
    this.router.navigate(['/tratamento']);
  }

  private listarTodos() {
    this.tratamentoService.listarTratamentos().subscribe(tratamentos => 
      this.tratamentos = tratamentos);
  }
}