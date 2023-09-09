import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyDGyxCl2SWabawqBiFREatyfY1jN2fKNY0",
  authDomain: "desafio-mobile-a50c5.firebaseapp.com",
  databaseURL: "https://desafio-mobile-a50c5-default-rtdb.firebaseio.com",
  projectId: "desafio-mobile-a50c5",
  storageBucket: "desafio-mobile-a50c5.appspot.com",
  messagingSenderId: "895511470489",
  appId: "1:895511470489:web:05d60c1320e4cef9e73308"
};


@NgModule({
  declarations: [AppComponent],
  // entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
