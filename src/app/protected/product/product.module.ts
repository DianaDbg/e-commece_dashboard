import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';


@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [SharedModule, ProductRoutingModule],
  exports: [ProductComponent, ProductListComponent],
})
export class ProductModule {}
