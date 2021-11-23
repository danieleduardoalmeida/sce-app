import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AmostrasPage } from './amostras.page';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesUsuarioComponent } from 'src/app/component/detalhes.usuario.component';

const routes: Routes = [
  {
    path: '',
    component: AmostrasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmostrasPage, DetalhesUsuarioComponent]
})


export class AmostrasPageModule {}