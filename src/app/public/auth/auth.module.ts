import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent],
  imports: [SharedModule, AuthRoutingModule],
  exports: [
    SharedModule,
    AuthRoutingModule,
    LoginComponent,
    ResetPasswordComponent,
  ],
})
export class AuthModule {}
