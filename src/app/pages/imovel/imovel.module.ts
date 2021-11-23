import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImovelPage } from './imovel.page';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaskPipe } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: ImovelPage
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
  declarations: [ImovelPage],
  providers: [
    MaskPipe
  ]
})


export class ImovelPageModule {}