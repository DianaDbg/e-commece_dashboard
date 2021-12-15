import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product/product.service';
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
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

  selected: any = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  temp: any = this.products;
  productId!: string;

  constructor(private productService: ProductService, private router: Router) {
    this.temp = this.products;
  }

  ngOnInit(): void {
    this.temp = this.products;
    this.getProducts();
    this.productService.checkNtc();
  }

  onSelect({ selected }: any) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: any) {
    console.log('Selected :', event?.row?.id);
    this.productId = event?.row?.id;
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
      (error) => console.log(error)
    );
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Product deleted !');
        this.products = this.products.filter((item) => item.id != id);
      },
      (error) => console.log('Product not deleted !')
    );
  }

  confirmBox() {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure?');
    confirmBox.setMessage('Confirm to delete this product !');
    confirmBox.setButtonLabels('YES', 'NO');

    confirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.DANGER,
    });

    confirmBox.openConfirmBox$().subscribe((response) => {
      console.log('Clicked button response: ', response);
      if (response.Success) {
        this.deleteProduct(this.productId);
      }
    });
  }
}
