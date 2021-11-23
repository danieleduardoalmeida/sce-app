import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AmostraModel } from 'src/app/model/amostra.model';
import { AmostraService } from 'src/app/service/amostra.service';

@Component({
  selector: 'app-amostras',
  templateUrl: './amostras.page.html',
  styleUrls: ['./amostras.page.scss'],
})

export class AmostrasPage implements OnInit {
  amostras: AmostraModel[];

  constructor(
    private router: Router,
    private amostraService: AmostraService) {
    this.amostras = [];
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarTodos();
  }

  alterar(id: string) {
    this.router.navigate(['/amostra', id]);
  }

  adicionar() {
    this.router.navigate(['/amostra']);
  }

  private listarTodos() {
    this.amostraService.listarAmostras().subscribe(amostras => this.amostras = amostras);
  }
}