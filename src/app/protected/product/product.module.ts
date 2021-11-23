import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';



@NgModule({
  declarations: [
    
  
    ProductComponent
  ],
  imports: [
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
