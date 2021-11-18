import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
