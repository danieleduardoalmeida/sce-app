import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VistoriaPage } from './vistoria.page';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskPipe } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: VistoriaPage
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
  declarations: [VistoriaPage],
  providers: [
    MaskPipe
  ]
})


export class VistoriaPageModule {}