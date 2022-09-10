import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AreaChartComponent } from './components/dashboard/area-chart/area-chart.component';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { TopCustomersComponent } from './components/top-customers/top-customers.component';

@NgModule({
  declarations: [DashboardComponent, AreaChartComponent, TopProductsComponent, TopCustomersComponent],
  imports: [SharedModule, DashboardRoutingModule],
  exports: [SharedModule, DashboardComponent, AreaChartComponent],
})
export class DashboardModule {}
