import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AnalisesEntradaPage } from './analises.entrada.page';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesUsuarioComponent } from 'src/app/component/detalhes.usuario.component';

const routes: Routes = [
  {
    path: '',
    component: AnalisesEntradaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnalisesEntradaPage, DetalhesUsuarioComponent]
})


export class AnalisesEntradaPageModule {}