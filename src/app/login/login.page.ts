import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email!: string;
  senha!: string;

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    try {
      this.authSrv.login(this.email, this.senha, this.router,
        function(email: string, nav: { navigate: (arg0: string[]) => void; }) {
          console.log('Entrou como ' + email);
          nav.navigate(['app/tabs/tab1']);
        });
    } catch (e) {
      console.log('Ocorreu um erro no login:' + JSON.stringify(e));
    }
  }

  cadastro() {
    this.router.navigate(['cadastro'])
  }


}
