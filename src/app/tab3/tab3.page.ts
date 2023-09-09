import { Component } from '@angular/core';
import { ProdutoCarrinho } from '../models';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  carrinho: ProdutoCarrinho[] = new Array<ProdutoCarrinho>();
  valorTotal: number = 0;

  constructor(private db: AngularFireDatabase, private router: Router) {
    this.getAll();
  }

  getAll() {
    this.db.list('carrinho', ref => ref.orderByChild('date'))
    .snapshotChanges()
    .subscribe(changes => {
      this.carrinho = new Array<ProdutoCarrinho>();
      this.valorTotal = 0;
        changes.map(item => {
          let itemdb = item.payload.val() as ProdutoCarrinho;
          let produto: ProdutoCarrinho = {
            id: itemdb['id'],
            nome: itemdb['nome'],
            valor: itemdb['valor'],
            quantidade: itemdb['quantidade'],
            key: String(item.key)
          };
          this.carrinho.push(produto)
          this.atualizaValorTotal(produto)
        })
      })
  }

  cartIsEmpty(): boolean {
    return this.carrinho.length === 0;
  }

  removeItem(key?: string){
    this.db.list('carrinho').remove(key);
  }

  limpaCarrinho() {
    this.db.list('carrinho').remove();
  }

  enviaPedido() {
    this.db.list('carrinho').remove();
    console.log('Pedido enviado');
    this.router.navigate(['success'])
  }

  atualizaValorTotal(produto: ProdutoCarrinho) {
    let quantidade = produto.quantidade ? produto.quantidade : 1;
    let valor = produto.valor ? produto.valor : 0;
    let soma = this.valorTotal + (quantidade * valor)
    this.valorTotal = Number(soma.toFixed(2))
  }
}
