import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserResponse } from './models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbAuth: AngularFireAuth) {
  }

  async registrarUsuario(email: string, senha: string) {
    this.registrar(email, senha).then(ref => {
      console.log('Novo usuário registrado: ' + ref.result?.user.uid);
    });
  }

  private async registrar(email: string, senha: string) {
    try {
      return  {
        result: await this.fbAuth.createUserWithEmailAndPassword(
          email, senha)
      } as UserResponse;
    } catch (e) {
      console.log(e);
      return  {
        error: e
      } as UserResponse;
    }
  }

  login(email: string, senha: string, nav: Router, callback: { (email: string, nav: { navigate: (arg0: string[]) => void; }): void; (arg0: string, arg1: any): void; }) {
    this.execLogin(email, senha).then(ref => {
      if (ref.error) {
        throw new Error("Usuário inválido");
      } else {
        callback(email, nav);
      }
    });
  }

  private async execLogin(email: string, senha: string) {
    try {
      return  {
        result: await this.fbAuth.signInWithEmailAndPassword(
          email, senha
        )
      } as UserResponse;
    } catch (e) {
      console.log(JSON.stringify(e));
      return  {
        error: e
      } as UserResponse;
    }
  }
}
