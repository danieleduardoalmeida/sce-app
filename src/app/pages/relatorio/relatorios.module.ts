import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RelatoriosPage } from './relatorios.page';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalhesUsuarioComponent } from 'src/app/component/detalhes.usuario.component';

const routes: Routes = [
  {
    path: '',
    component: RelatoriosPage
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
  declarations: [RelatoriosPage, DetalhesUsuarioComponent]
})


export class RelatoriosPageModule {}