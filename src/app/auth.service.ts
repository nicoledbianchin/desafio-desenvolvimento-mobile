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
    try {
      const result = await this.fbAuth.createUserWithEmailAndPassword(
          email, senha);
      console.log('Novo usuário registrado: ' + result?.user?.uid);

      return { result: result } as UserResponse;
    } catch (error) {
      console.log("Ocorreu um erro ao tentar registrar: " + error)

      return  {
        error: error
      } as UserResponse;
    }
  }

  async login(email: string, senha: string, nav: Router, callback: { (email: string, nav: { navigate: (arg0: string[]) => void; }): void; (arg0: string, arg1: any): void; }) {
    try{
      const result = await this.fbAuth.signInWithEmailAndPassword(
        email, senha
      );
      callback(email, nav)

      return { result : result } as UserResponse;
    } catch(error) {
      console.log("Ocorreu um erro ao tentar logar: " + error)

      return  {
        error: error
      } as UserResponse;
    }
  }
}
