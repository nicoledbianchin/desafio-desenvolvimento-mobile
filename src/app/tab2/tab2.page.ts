import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps'
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Cliente } from '../models';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('mapa')mapRef!: ElementRef;
  mapa!: GoogleMap;
  clientesDb: Cliente[] = new Array<Cliente>();
  constructor(private modalC: ModalController, private http: HttpClient) {
  }

  ionViewDidEnter() {
    this.criaMapa();
  }

  buscarClientes() {
    this.http.get<Cliente[]>('https://desafio-mobile-a50c5-default-rtdb.firebaseio.com/clientes.json').subscribe(data => this.clientesDb = data)
  }

  async criaMapa() {
    this.buscarClientes();
    this.mapa = await GoogleMap.create({
      id: 'mapa-clientes',
      apiKey: 'AIzaSyCUcp4qVaSfiWaplQULTP6rExLV4eJRV8w',
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: -29.695666114544306,
          lng: -51.48097442650094
        },
        zoom: 16,
      }
    })
    await this.criaMarcadores();
  }

  async criaMarcadores() {
    const clientes: Marker[] = [
      {
        coordinate: {
          lat: -29.695666114544306,
          lng: -51.48097442650094
        },
        title: 'TATS Comunicação Visual',
        iconUrl: 'https://tats.com.br/images/logo.png',
        iconSize: {
          width: 50,
          height: 50
        }
      },
      {
        coordinate: {
          lat: -29.69597832759312, 
          lng: -51.478903761083416
        },
        title: 'Quero Quero',
      },
      {
        coordinate: {
          lat: -29.69777979575348,
          lng:  -51.48225954688075,
        },
        title: 'Lampert construção',
      },
      {
        coordinate: {
          lat: -29.69077120380808, 
          lng:  -51.47988847409505  
        },
        title: 'Bar Espindola',
      },
      {
        coordinate: {
          lat: -29.7011161611084, 
          lng: - 51.4806824080585
        },
        title: 'Boticário',
      },
      {
        coordinate: {
          lat: -29.70046380787993, 
          lng:  -51.48657253904503 
        },
        title: 'Agro Bueno',
      },
      {
        coordinate: {
          lat: -29.700575640195233, 
          lng: -51.47820404692416 
        },
        title: 'Loja da Josica',
      },
      {
        coordinate: {
          lat: -29.702461442640132,
          lng:  -51.48598966264113
        },
        title: 'TecnoMotor',
      },
      {
        coordinate: {
          lat: -29.698072014519035,
          lng:  -51.48945507665313
        },
        title: 'Mercado Redenção',
      },
      {
        coordinate: {
          lat: -29.693812705627767, 
          lng: -51.47521902151404 
        },
        title: 'Cartec',
      },
    ]
    
    await this.mapa.addMarkers(clientes);

    this.mapa.setOnMarkerClickListener(async(cliente) => {
      const clienteInfo = this.clientesDb.find((item) => item.nome == cliente.title);
      console.log(clienteInfo)
      const modal = await this.modalC.create({
        component: ModalPage,
        componentProps: { cliente, clienteInfo },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3
      });
      modal.present();
    })
  }
}
