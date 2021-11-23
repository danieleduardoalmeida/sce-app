import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImovelService } from 'src/app/service/imovel.service';
import { ImovelModel } from 'src/app/model/imovel.model';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.page.html',
  styleUrls: ['./imoveis.page.scss'],
})

export class ImoveisPage implements OnInit {
  imoveis: ImovelModel[];

  constructor(
    private router: Router,
    private imovelService: ImovelService) {
      this.imoveis = [];
    }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.listarTodos();
  }

  alterar(id: string){
    this.router.navigate(['/imovel', id]);
  }

  adicionar(){
    this.router.navigate(['/imovel']);
  }

  private listarTodos() {
    this.imovelService.listarImoveis().subscribe(imoveis => this.imoveis = imoveis);
  }

}