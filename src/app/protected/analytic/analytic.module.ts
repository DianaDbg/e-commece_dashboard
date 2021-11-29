import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module'; 

import { AnalyticRoutingModule } from './analytic-routing.module';
import { AnalyticsComponent } from './components/analytics/analytics.component';


@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    SharedModule,
    AnalyticRoutingModule
  ]
})
export class AnalyticModule { }
