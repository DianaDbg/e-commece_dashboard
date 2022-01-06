import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { Order } from 'src/app/protected/order/models/order';
import { OrderService } from 'src/app/protected/order/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  rows = [
    {
      id: '#A453J',
      date: '04/09/21',
      customers: 'Bessie Copper',
      items: 12,
      status: 'Pending',
    },
    {
      id: '#SD53J',
      date: '04/09/21',
      customers: 'Jenny Wison',
      items: 20,
      status: 'Completed',
    },
    {
      id: '#AJ7JD',
      date: '04/09/21',
      customers: 'Dianne Russel',
      items: 15,
      status: 'Canceled',
    },
    {
      id: 'DK97KA',
      date: '04/09/21',
      customers: 'Robert Fox',
      items: 32,
      status: 'Pending',
    },
    {
      id: '#57G3J',
      date: '04/09/21',
      customers: 'Ronald Richards',
      items: 23,
      status: 'Completed',
    },
    {
      id: '#A843J',
      date: '04/09/21',
      customers: 'Jerome Bell',
      items: 12,
      status: 'Pending',
    },
    {
      id: 'QK67LP',
      date: '04/09/21',
      customers: 'Jerome Bell',
      items: 20,
      status: 'Pending',
    },
    {
      id: '617HDA',
      date: '06/09/21',
      customers: 'Devon Lane',
      items: 15,
      status: 'Canceled',
    },
    {
      id: 'JJD12J',
      date: '04/09/21',
      customers: 'Albert Flores',
      items: 32,
      status: 'Pending',
    },
    {
      id: 'DJP56P',
      date: '04/09/21',
      customers: 'George Bell',
      items: 23,
      status: 'Completed',
    },
    {
      id: 'UHS48P',
      date: '04/09/21',
      customers: 'Moussa Fall',
      items: 23,
      status: 'Canceled',
    },
    {
      id: 'HDS145',
      date: '04/09/21',
      customers: 'Rocky Daba',
      items: 12,
      status: 'Completed',
    },
    {
      id: '567DHD',
      date: '04/09/21',
      customers: 'Damien Sène',
      items: 20,
      status: 'Completed',
    },
    {
      id: '#A4DZ9',
      date: '05/09/21',
      customers: 'Pierre Bong',
      items: 15,
      status: 'Canceled',
    },
    {
      id: '#DF09J',
      date: '04/09/21',
      customers: 'Dame Ndoye',
      items: 32,
      status: 'Completed',
    },
  ];

  orders!: Order[];

  columns = [
    { prop: 'customers' },
    { name: 'Id' },
    { name: 'Date' },
    { name: 'Items' },
    { name: 'Status' },
  ];

  ngOnInit() {
    this.getOrders();
  }

  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  selected: any = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  temp: any = this.rows;
  constructor(private orderService: OrderService) {
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
    const temp = this.temp.filter(function (d: { customers: string }) {
      return d.customers.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (response) => {
        console.log('getOders sucess !', response);
        this.orders = response.results;
      },
      (error) => {
        console.log('getOrders failed !', error);
      }
    );
  }
}
