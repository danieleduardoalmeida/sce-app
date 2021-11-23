import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/autenticacao.service';

@Component({
    selector: 'app-detalhes-usuario',
    templateUrl: './detalhes.usuario.component.html'
})
export class DetalhesUsuarioComponent implements OnInit {

    nomeUsuario: string;

    constructor(
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.mostrarNomeUsuario();
    }

    private mostrarNomeUsuario() {
        this.nomeUsuario = this.authenticationService.getUsername();
    }
}