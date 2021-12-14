// import { Component, ViewChild, AfterViewInit } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.scss'],
// })
// export class ProductListComponent implements AfterViewInit {
//   products: Partial<Product>[] = [
//     { name: 'Samson shoes', category: 'Shoes', price: '24.990', quantity: 12 },
//     { name: 'Samson Hat', category: 'Hat', price: '240', quantity: 20 },
//     { name: 'Samson T-Shirt', category: 'T-Shirt', price: '40', quantity: 15 },
//     { name: 'Samson boxer', category: 'Boxer', price: '50', quantity: 32 },
//     { name: 'Samson Pull', category: 'Pull', price: '150', quantity: 23 },
//     { name: 'Samson shoes', category: 'Shoes', price: '24.990', quantity: 12 },
//     { name: 'Samson Hat', category: 'Hat', price: '240', quantity: 20 },
//     { name: 'Samson T-Shirt', category: 'T-Shirt', price: '40', quantity: 15 },
//     { name: 'Samson boxer', category: 'Boxer', price: '50', quantity: 32 },
//     { name: 'Samson Pull', category: 'Pull', price: '150', quantity: 23 },
//   ];

//   // columns we will show on the table
//   public displayedColumns = ['name', 'category', 'price', 'quantity'];
//   //the source where we will get the data
//   public dataSource = new MatTableDataSource<Partial<Product>>(this.products);
//   constructor() {}

//   @ViewChild(MatPaginator)
//   paginator!: MatPaginator;

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }
// }
