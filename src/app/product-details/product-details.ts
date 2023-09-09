import { Component } from '@angular/core';
import { Produto, ProdutoCarrinho } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-product-details',
  templateUrl: 'product-details.page.html',
  styleUrls: ['product-details.page.scss']
})
export class ProductDetailsPage {
  produto: Produto = {
    id: 0,
    imagem: '',
    nome: '',
    valor: 0
  };

  constructor(private route: ActivatedRoute, private router: Router,  private db: AngularFireDatabase) {
    this.produto.id = Number(this.route.snapshot.paramMap.get('id'))
    this.produto.nome = String(this.route.snapshot.paramMap.get('nome'))
    this.produto.imagem = String(this.route.snapshot.paramMap.get('imagem'))
    this.produto.valor = Number(this.route.snapshot.paramMap.get('valor'))
  }

  adicionarCarrinho() {
    let produtoCarrinho: ProdutoCarrinho = {
      id: this.produto.id,
      nome: this.produto.nome,
      quantidade: 1,
      valor: this.produto.valor
    }
    console.log(produtoCarrinho)
    let carrinhoListRef = this.db.list<ProdutoCarrinho>('carrinho');
    carrinhoListRef.push(produtoCarrinho);
    this.router.navigate(['app/tabs/tab1']);
  }

}
