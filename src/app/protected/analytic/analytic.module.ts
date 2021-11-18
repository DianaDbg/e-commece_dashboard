import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module'; 

import { AnalyticRoutingModule } from './analytic-routing.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AnalyticRoutingModule
  ]
})
export class AnalyticModule { }
