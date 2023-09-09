import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetailsPage } from './product-details';
import { ProductDetailsRoutingModule } from './product-details-routing.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProductDetailsRoutingModule
  ],
  declarations: [ProductDetailsPage]
})
export class ProductDetailsPageModule {}
