import { Component, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent  {

  rows =  [
    { name: 'Samson shoes', category: 'Shoes', price: '24.990', quantity: 12 },
    { name: 'Samson Hat', category: 'Hat', price: '240', quantity: 20 },
    { name: 'Samson T-Shirt', category: 'T-Shirt', price: '40', quantity: 15 },
    { name: 'Samson boxer', category: 'Boxer', price: '50', quantity: 32 },
    { name: 'Samson Pull', category: 'Pull', price: '150', quantity: 23 },
    { name: 'Samson shoes', category: 'Shoes', price: '24.990', quantity: 12 },
    { name: 'Samson Hat', category: 'Hat', price: '240', quantity: 20 },
    { name: 'Samson T-Shirt', category: 'T-Shirt', price: '40', quantity: 15 },
    { name: 'Samson boxer', category: 'Boxer', price: '50', quantity: 32 },
    { name: 'Samson Pull', category: 'Pull', price: '150', quantity: 23 },
    { name: 'Samson Pull', category: 'Pull', price: '150', quantity: 23 },
    { name: 'Samson shoes', category: 'Shoes', price: '24.990', quantity: 12 },
    { name: 'Samson Hat', category: 'Hat', price: '240', quantity: 20 },
    { name: 'Samson T-Shirt', category: 'T-Shirt', price: '40', quantity: 15 },
    { name: 'Samson boxer', category: 'Boxer', price: '50', quantity: 32 },
  ];

  columns = [{ prop: 'name' }, { name: 'Category' }, { name: 'Price' }, { name: 'Quantity' }];
  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  selected: any = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  temp: any = this.rows;
  
  constructor() {
    this.temp = this.rows;
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
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: { name: string; }) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  
}
