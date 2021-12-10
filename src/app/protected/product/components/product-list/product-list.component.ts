import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  // rows = [
  //   { name: 'Samson shoes', category: 'Shoes', price: '24.990', quantity: 12 },
  //   { name: 'Samson Hat', category: 'Hat', price: '240', quantity: 20 },
  //   { name: 'Samson T-Shirt', category: 'T-Shirt', price: '40', quantity: 15 },
  //   { name: 'Samson boxer', category: 'Boxer', price: '50', quantity: 32 },
  //   { name: 'Samson Pull', category: 'Pull', price: '150', quantity: 23 },
  //   { name: 'Samson shoes', category: 'Shoes', price: '24.990', quantity: 12 },
  //   { name: 'Samson Hat', category: 'Hat', price: '240', quantity: 20 },
  //   { name: 'Samson T-Shirt', category: 'T-Shirt', price: '40', quantity: 15 },
  //   { name: 'Samson boxer', category: 'Boxer', price: '50', quantity: 32 },
  //   { name: 'Samson Pull', category: 'Pull', price: '150', quantity: 23 },
  //   { name: 'Samson Pull', category: 'Pull', price: '150', quantity: 23 },
  //   { name: 'Samson shoes', category: 'Shoes', price: '24.990', quantity: 12 },
  //   { name: 'Samson Hat', category: 'Hat', price: '240', quantity: 20 },
  //   { name: 'Samson T-Shirt', category: 'T-Shirt', price: '40', quantity: 15 },
  //   { name: 'Samson boxer', category: 'Boxer', price: '50', quantity: 32 },
  // ];

  columns = [
    { prop: 'name' },
    { name: 'description' },
    { name: 'price' },
    { name: 'quantity' },
  ];

  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  selected: any = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  temp: any = this.products;

  constructor(private productService: ProductService) {
    this.temp = this.products;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  onSelect({ selected }: any) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
  }

  add() {
    this.selected.push(this.products[1], this.products[3]);
  }

  update() {
    this.selected = [this.products[1], this.products[3]];
  }

  remove() {
    this.selected = [];
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: { name: string }) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.products = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.results;
        console.log(this.products);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
