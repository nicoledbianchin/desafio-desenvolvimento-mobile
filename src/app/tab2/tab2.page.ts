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
  @ViewChild('map')mapRef!: ElementRef;
  map!: GoogleMap;
  constructor(private modalCtrl: ModalController) {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
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
    await this.addMarkers();
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: -29.695666114544306,
          lng: -51.48097442650094
        },
        title: 'TATS Comunicação Visual',
        snippet: 'Empresa'
      }
    ]
    
    const result = await this.map.addMarkers(markers);

    this.map.setOnMarkerClickListener(async(marker) => {
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: { marker },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3
      });
      modal.present();
    })
  }
}
