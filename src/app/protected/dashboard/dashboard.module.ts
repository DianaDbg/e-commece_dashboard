import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AreaChartComponent } from './components/dashboard/area-chart/area-chart.component';

@NgModule({
  declarations: [DashboardComponent, AreaChartComponent],
  imports: [SharedModule, DashboardRoutingModule],
  exports: [SharedModule, DashboardComponent, AreaChartComponent],
})
export class DashboardModule {}
