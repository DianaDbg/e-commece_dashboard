import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { LoginComponent } from './public/auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'protected',
    pathMatch: 'full',
    loadChildren: () =>
      import('./protected/protected.module').then((m) => m.ProtectedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
