import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { OrderListComponent } from './components/order/components/order-list/order-list.component';


@NgModule({
  declarations: [
    OrderComponent,
    OrderListComponent
  ],
  imports: [
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
