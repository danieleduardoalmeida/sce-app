import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../service/autenticacao.service';
import { Router } from '@angular/router';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  usuarioAdministrador = false;
  usuarioSecretariaSaude = false;
  usuarioAgenteEpidemiologico = false;
  subMenuAnaliseVisivel = false;

    constructor(    
      private authenticationService: AuthenticationService,
      private router: Router) {
    }

    ngOnInit(){
     this.verificarPermissoesUsuario();
    }

    verificarPermissoesUsuario(){
      this.authenticationService.getUsuarioLogadoObservable().subscribe((usuario) => {
        this.definirPermissoes(usuario);
      });
    }

    definirPermissoes(usuario: any){
      switch (usuario.tipo) {
        case "ADMINISTRADOR":
          this.usuarioAdministrador = true;
          this.usuarioAgenteEpidemiologico = false;
          this.usuarioSecretariaSaude = false;
          break;
        case "AGENTE_EPIDEMIOLOGICO":
          this.usuarioAdministrador = false;
          this.usuarioAgenteEpidemiologico = true;
          this.usuarioSecretariaSaude = false;
          break;
          case "SECRETARIA_SAUDE":
            this.usuarioAdministrador = false;
            this.usuarioAgenteEpidemiologico = false;
            this.usuarioSecretariaSaude = true;
            break;
        default:
          break;
      }
    }

    irPaginaVistorias() {
        this.router.navigate(['/vistorias']);
      }
    
      irPaginaImoveis() {
        this.router.navigate(['/imoveis']);
      }
    
      irPaginaUsuarios() {
        this.router.navigate(['/usuarios']);
      }
    
      irPaginaAnalisesEntrada(){
        this.router.navigate(['/analisesEntrada']);
      }
    
      irPaginaAnalisesConclusao(){
        this.router.navigate(['/analisesConclusao']);
      }
    
      irPaginaTratamentos() {
        this.router.navigate(['/tratamentos']);
      }
    
      irPaginaSenha() {
        this.router.navigate(['/senha']);
      }
    
      irPaginaAmostras() {
        this.router.navigate(['/amostras']);
      }

      irPaginaRelatorio() {
        this.router.navigate(['/relatorios']);
      }

      logout() {
        this.authenticationService.logout();
      }
    
      mostrarSubmenuAnalise(): void {
        this.subMenuAnaliseVisivel = !this.subMenuAnaliseVisivel;
      }
    
      isGroupShown(): boolean{
        return this.subMenuAnaliseVisivel;
      } 
}