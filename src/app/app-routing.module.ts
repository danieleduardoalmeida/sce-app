import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'usuarios', loadChildren: () => import('./pages/usuario/usuarios.module').then( m => m.UsuariosPageModule)},
  { path: 'usuario/:id', loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)},
  { path: 'usuario', loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)},
  { path: 'imoveis', loadChildren: () => import('./pages/imovel/imoveis.module').then( m => m.ImoveisPageModule)},
  { path: 'imovel/:id', loadChildren: () => import('./pages/imovel/imovel.module').then( m => m.ImovelPageModule)},
  { path: 'imovel', loadChildren: () => import('./pages/imovel/imovel.module').then( m => m.ImovelPageModule)},
  { path: 'senha', loadChildren: () => import('./pages/senha/senha.module').then( m => m.SenhaPageModule)},
  { path: 'vistorias', loadChildren: () => import('./pages/vistoria/vistorias.module').then( m => m.VistoriasPageModule)},
  { path: 'vistoria/:id', loadChildren: () => import('./pages/vistoria/vistoria.module').then( m => m.VistoriaPageModule)},
  { path: 'vistoria', loadChildren: () => import('./pages/vistoria/vistoria.module').then( m => m.VistoriaPageModule)},
  { path: 'analisesEntrada', loadChildren: () => import('./pages/analise/entrada/analises.entrada.module').then( m => m.AnalisesEntradaPageModule)},
  { path: 'analiseEntrada', loadChildren: () => import('./pages/analise/entrada/analise.entrada.module').then( m => m.AnaliseEntradaPageModule)},
  { path: 'analiseEntrada/:id', loadChildren: () => import('./pages/analise/entrada/analise.entrada.module').then( m => m.AnaliseEntradaPageModule)},
  { path: 'analisesConclusao', loadChildren: () => import('./pages/analise/conclusao/analises.conclusao.module').then( m => m.AnalisesConclusaoPageModule)},
  { path: 'analiseConclusao', loadChildren: () => import('./pages/analise/conclusao/analise.conclusao.module').then( m => m.AnaliseConclusaoPageModule)},
  { path: 'analiseConclusao/:id', loadChildren: () => import('./pages/analise/conclusao/analise.conclusao.module').then( m => m.AnaliseConclusaoPageModule)},
  { path: 'tratamentos', loadChildren: () => import('./pages/tratamento/tratamentos.module').then( m => m.TratamentosPageModule)},
  { path: 'tratamento/:id', loadChildren: () => import('./pages/tratamento/tratamento.module').then( m => m.TratamentoPageModule)},
  { path: 'tratamento', loadChildren: () => import('./pages/tratamento/tratamento.module').then( m => m.TratamentoPageModule)},
  { path: 'amostras', loadChildren: () => import('./pages/amostra/amostras.module').then( m => m.AmostrasPageModule)},
  { path: 'amostra/:id', loadChildren: () => import('./pages/amostra/amostra.module').then( m => m.AmostraPageModule)},
  { path: 'amostra', loadChildren: () => import('./pages/amostra/amostra.module').then( m => m.AmostraPageModule)},
  { path: 'relatorios', loadChildren: () => import('./pages/relatorio/relatorios.module').then( m => m.RelatoriosPageModule)},
  { path: 'relatorio/:id/:dataVistoria', loadChildren: () => import('./pages/relatorio/relatorio.module').then( m => m.RelatorioPageModule)},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
