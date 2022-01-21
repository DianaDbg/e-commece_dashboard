import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  orders!: Order[];
  _orders = [{}];
  orderId!: string;

  columns = [
    { prop: 'customer' },
    { name: 'Id' },
    { name: 'Price' },
    { name: 'Items' },
    { name: 'Status' },
  ];

  ngOnInit() {
    this.getOrders();
    this._orders.shift();
  }

  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  selected: any = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  temp: any = this._orders;
  constructor(private orderService: OrderService, private router: Router) {
    this.temp = this._orders;
  }

  onSelect({ selected }: any) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
    this.orderId = event?.row?.id;
  }

  add() {
    this.selected.push(this._orders[1], this._orders[3]);
  }

  update() {
    this.selected = [this._orders[1], this._orders[3]];
  }

  remove() {
    this.selected = [];
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d: { customer: string }) {
      return d.customer.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this._orders = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  toCapitalize(str: string) {
    const lower = str.toLocaleLowerCase();
    return str.charAt(0).toLocaleUpperCase() + lower.slice(1);
  }

  getOrders() {
    this.orderService.getOrders().subscribe(
      (response) => {
        console.log('getOders sucess !', response);
        this.orders = response.results;
        this.orders.forEach(async (order: any) => {
          let payload = {
            id: order?.id,
            number: order.number,
            customer: order?.shipping_address?.address?.name,
            price: '$' + order.total_prices,
            items: await order.cart.items.length,
            payment: order.payment_method,
            status: await this.toCapitalize(order.status),
          };
          this._orders = [...this._orders, payload];
        });
      },
      (error) => {
        console.log('getOrders failed !', error);
      }
    );
  }

  confirmOrder() {
    this.orderService.confirmOrder(this.orderId).subscribe(
      (response) => {
        console.log('Order confirmed !', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.orderId).subscribe(
      (response) => {
        console.log('Order canceled !', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToOrderDetails() {
    this.router.navigate(['/order/' + this.orderId]);
  }
}
