import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnaliseConclusaoPage } from './analise.conclusao.page';
import { ExemplarEspecieModal } from 'src/app/modal/exemplar.especie.modal';

const routes: Routes = [
  {
    path: '',
    component: AnaliseConclusaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnaliseConclusaoPage, ExemplarEspecieModal],
  entryComponents: [ExemplarEspecieModal]
})


export class AnaliseConclusaoPageModule {}