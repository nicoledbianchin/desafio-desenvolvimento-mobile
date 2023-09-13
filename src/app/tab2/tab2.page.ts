import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps'
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('mapa')mapRef!: ElementRef;
  mapa!: GoogleMap;
  constructor(private modalC: ModalController) {}

  ionViewDidEnter() {
    this.criaMapa();
  }

  async criaMapa() {
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
        snippet: 'Empresa'
      }
    ]
    
    await this.mapa.addMarkers(clientes);

    this.mapa.setOnMarkerClickListener(async(cliente) => {
      const modal = await this.modalC.create({
        component: ModalPage,
        componentProps: { cliente },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3
      });
      modal.present();
    })
  }
}
