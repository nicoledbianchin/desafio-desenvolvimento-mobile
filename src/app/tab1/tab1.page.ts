import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Catalogo, Produto } from '../models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  catalogo!: Catalogo;

  constructor(private router: Router, private http: HttpClient) {
    this.getData();
  }

  navigateToProductDetails(id: number, nome: string, imagem: string, valor: number) {
    this.router.navigate(['app/tabs/product-details', id, nome, imagem, valor]);
  }

  getData() {
    this.http.get<Catalogo>('https://desafio-mobile-a50c5-default-rtdb.firebaseio.com/catalogo.json').subscribe(data => this.catalogo = data)
  }

}
