import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productID!: string;
  productData!: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  loadProductDetails(productID: string) {
    this.productService.getProductById(productID).subscribe((product) => {
      this.productData = product.results;
    });
  }

  goToProductDetails() {}

  ngOnInit(): void {
    this.productID = this.route.snapshot.params['id'];
    this.loadProductDetails(this.productID);
    console.log(this.productData);
  }
}
