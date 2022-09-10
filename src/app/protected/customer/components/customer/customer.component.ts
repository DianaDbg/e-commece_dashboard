import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';

import { Customer } from '../models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  rows = [
    {
      firstname: 'Brooklyn',
      lastname: 'Simmons',
      email: 'brooklyn@gmail.com',
      phone: '+18177140994',
      gender: 'Male',
      orders: 24,
    },
    {
      firstname: 'Jacob',
      lastname: 'Jones',
      email: 'jacob@gmail.com',
      phone: '+18063425664',
      gender: 'Male',
      orders: 14,
    },
    {
      firstname: 'Leslie',
      lastname: 'Alexander',
      email: 'leslie@gmail.com',
      phone: '+18063425664',
      gender: 'Female',
      orders: 14,
    },
    {
      firstname: 'Theresa',
      lastname: 'Webb',
      email: 'theresa.w@gmail.com',
      phone: '+18063425664',
      gender: 'Female',
      orders: 14,
    },
    {
      firstname: 'Albert',
      lastname: 'Flores',
      email: 'albert.fw@gmail.com',
      phone: '+18063425664',
      gender: 'Male',
      orders: 14,
    },
    {
      firstname: 'Brooklyn',
      lastname: 'Simmons',
      email: 'brooklyn@gmail.com',
      phone: '+18177140994',
      gender: 'Male',
      orders: 24,
    },
    {
      firstname: 'Jacob',
      lastname: 'Jones',
      email: 'jacob@gmail.com',
      phone: '+18063425664',
      gender: 'Male',
      orders: 14,
    },
    {
      firstname: 'Leslie',
      lastname: 'Alexander',
      email: 'leslie@gmail.com',
      phone: '+18063425664',
      gender: 'Female',
      orders: 14,
    },
    {
      firstname: 'Theresa',
      lastname: 'Webb',
      email: 'theresa.w@gmail.com',
      phone: '+18063425664',
      gender: 'Female',
      orders: 14,
    },
    {
      firstname: 'Albert',
      lastname: 'Flores',
      email: 'albert.fw@gmail.com',
      phone: '+18063425664',
      gender: 'Male',
      orders: 14,
    },
  ];

  customers!: Customer[];

  columns = [
    { prop: 'last_name' },
    { name: 'first_name' },
    { name: 'email' },
    { name: 'gender' },
    { name: 'orders' },
  ];

  ngOnInit() {}

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
    const temp = this.temp.filter(function (d: { lastname: string }) {
      return d.lastname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
