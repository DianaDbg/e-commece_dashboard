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
  id!: string;
  product: Partial<Product> = {
    name: '',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  goToProductDetails() {}

  async ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    await this.getProductById(this.id);
  }

  getProductById(id: string) {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.product = response.data;
        console.log('Product by id', this.product);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
