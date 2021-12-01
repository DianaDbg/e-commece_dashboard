import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PublicRoutingModule } from './public-routing.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, PublicRoutingModule, AuthModule],
  exports: [AuthModule],
})
export class PublicModule {}
