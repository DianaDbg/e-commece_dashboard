import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';


@NgModule({
  declarations: [ProductComponent, ProductListComponent, AddProductComponent, CategoryComponent, CategoryListComponent, ProductDetailsComponent, UpdateProductComponent],
  imports: [SharedModule, ProductRoutingModule],
  exports: [ProductComponent, ProductListComponent],
})
export class ProductModule {}
