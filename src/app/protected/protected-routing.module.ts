import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'product-list',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./order/order.module').then((m) => m.OrderModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'analytics',
        loadChildren: () =>
          import('./analytic/analytic.module').then((m) => m.AnalyticModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
