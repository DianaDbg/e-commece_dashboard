import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { AnalyticModule } from './analytic/analytic.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ProtectedRoutingModule,
    DashboardModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    AnalyticModule
  ],
  exports: [
    SharedModule,
    ProtectedRoutingModule,
    DashboardModule,
    ProductModule,
    OrderModule,
    CustomerModule,
    AnalyticModule
  ]
})
export class ProtectedModule { }
