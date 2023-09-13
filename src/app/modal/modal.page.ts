import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() cliente: any;
  @Input() clienteInfo!: Cliente;

  constructor() { }

  ngOnInit() {
  }

  exibeMarker(marker: any){
    console.log(marker)
  }

}
