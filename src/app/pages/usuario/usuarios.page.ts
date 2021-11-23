import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})

export class UsuariosPage implements OnInit {
  usuarios: UsuarioModel[];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService) {
      this.usuarios = [];
    }

  ngOnInit() {}

  ionViewWillEnter(){
    this.listarUsuarios();
  }

  alterar(id: string) {
    this.router.navigate(['/usuario', id]);
  }

  adicionar() {
    this.router.navigate(['/usuario']);
  }

  private listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe(usuarios => this.usuarios = usuarios);
  }
}