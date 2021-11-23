import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VistoriaModel } from 'src/app/model/vistoria.model';
import { VistoriaService } from 'src/app/service/vistoria.service';

@Component({
  selector: 'app-vistorias',
  templateUrl: './vistorias.page.html',
  styleUrls: ['./vistorias.page.scss'],
})

export class VistoriasPage implements OnInit {
  vistorias: VistoriaModel[];
  falhas: boolean[];

  constructor(
    private router: Router,
    private vistoriaService: VistoriaService) {
    this.vistorias = [];
    this.falhas = [];
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarTodos();
  }

  alterar(id: string) {
    this.router.navigate(['/vistoria', id]);
  }

  adicionar() {
    this.router.navigate(['/vistoria']);
  }

  private listarTodos() {
    this.vistoriaService.listarVistorias().subscribe(vistorias => this.vistorias = vistorias);
  }
}