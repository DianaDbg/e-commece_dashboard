import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';


@NgModule({
  declarations: [ProductComponent, ProductListComponent, AddProductComponent, CategoryComponent, CategoryListComponent],
  imports: [SharedModule, ProductRoutingModule],
  exports: [ProductComponent, ProductListComponent],
})
export class ProductModule {}
