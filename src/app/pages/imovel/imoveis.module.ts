import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImoveisPage } from './imoveis.page';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesUsuarioComponent } from 'src/app/component/detalhes.usuario.component';

const routes: Routes = [
  {
    path: '',
    component: ImoveisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImoveisPage, DetalhesUsuarioComponent]
})


export class ImoveisPageModule {}