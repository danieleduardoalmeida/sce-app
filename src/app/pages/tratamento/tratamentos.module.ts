import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TratamentosPage } from './tratamentos.page';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesUsuarioComponent } from 'src/app/component/detalhes.usuario.component';

const routes: Routes = [
  {
    path: '',
    component: TratamentosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TratamentosPage, DetalhesUsuarioComponent]
})


export class TratamentosPageModule {}