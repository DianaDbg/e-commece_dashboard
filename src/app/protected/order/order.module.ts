import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
