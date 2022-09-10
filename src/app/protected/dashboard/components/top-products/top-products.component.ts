import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Product } from 'src/app/protected/product/models/product';
import { ProductService } from 'src/app/protected/product/services/product/product.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss'],
})
export class TopProductsComponent implements OnInit {
  products!: Product[];
  @Input()
  product!: Product;

  columns = [
    { prop: 'name' },
    { name: 'description' },
    { name: 'price' },
    { name: 'quantity' },
  ];

  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  ColumnMode = ColumnMode;

  productId!: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.results;
        console.log(this.products);
      },
      (error) => console.log(error)
    );
  }
}
