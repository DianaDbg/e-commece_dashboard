import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  cards = [
    {
      title: 'Orders',
      img: '../../../../../assets/orders.png',
      number: 5122,
    },
    {
      title: 'Total Pending',
      img: '../../../../../assets/pending.png',
      number: 145,
    },
    {
      title: 'Total Completed',
      img: '../../../../../assets/done.png',
      number: 1204,
    },
  ];

  /** Based on the screen size, switch from standard to one column per row */
  // Row1 = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         {
  //           title: 'Orders',
  //           cols: 2,
  //           rows: 1,
  //           img: '../../../../../assets/orders.png',
  //           number: 5122,
  //         },
  //         {
  //           title: 'Total Pending',
  //           cols: 2,
  //           rows: 1,
  //           img: '../../../../../assets/pending.png',
  //           number: 145,
  //         },
  //         {
  //           title: 'Total Competed',
  //           cols: 2,
  //           rows: 1,
  //           img: '../../../../../assets/done.png',
  //           number: 1204,
  //         },
  //       ];
  //     }

  //     return [
  //       {
  //         title: 'Orders',
  //         cols: 1,
  //         rows: 1,
  //         img: '../../../../../assets/orders.png',
  //         number: 5122,
  //       },
  //       {
  //         title: 'Total Pending',
  //         cols: 1,
  //         rows: 1,
  //         img: '../../../../../assets/pending.png',
  //         number: 145,
  //       },
  //       {
  //         title: 'Total Completed',
  //         cols: 1,
  //         rows: 1,
  //         img: '../../../../../assets/done.png',
  //         number: 1204,
  //       },
  //     ];
  //   })
  // );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
