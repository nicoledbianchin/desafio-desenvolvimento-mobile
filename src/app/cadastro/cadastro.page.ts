import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  email!: string;
  senha!: string;


  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit() {
  }

  registrar() {
    this.authSrv.registrarUsuario(this.email, this.senha).then (res => {
      this.router.navigate(['']);
    });
  }
}
