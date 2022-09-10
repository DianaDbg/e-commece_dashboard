import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-top-customers',
  templateUrl: './top-customers.component.html',
  styleUrls: ['./top-customers.component.scss'],
})
export class TopCustomersComponent implements OnInit {
  Customers = [
    {
      name: 'Brooklyn Simmons',
      email: 'brooklyn@gmail.com',
      img: '../../../../../assets/image.png',
    },
    {
      name: 'Jacob Jones',
      email: 'jacob@gmail.com',
      img: '../../../../../assets/image-1.png',
    },
    {
      name: 'Leslie Alexander',
      email: 'leslie@gmail.com',
      img: '../../../../../assets/image-2.png',
    },
    {
      name: 'Theresa Webb',
      email: 'theresa.w@live.fr',
      img: '../../../../../assets/image-3.png',
    },
    {
      name: 'Albert Flores',
      email: 'albert.f@gmail.com',
      img: '../../../../../assets/image-4.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
