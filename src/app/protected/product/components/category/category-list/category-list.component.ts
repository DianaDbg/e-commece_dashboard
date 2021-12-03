import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements AfterViewInit {
  @Input()
  categories!: Category[];

  columns = [
    { prop: 'Name' },
    { name: 'Slug' },
    { name: 'Description' },
    { name: 'Parent' },
    { name: 'Action' },
  ];

  @ViewChild(DatatableComponent)
  table!: DatatableComponent;
  selected: any = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  temp: Category[] = this.categories;

  constructor() {}

  ngAfterViewInit(): void {
    this.temp = this.categories;
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
    this.selected.push(this.categories[1], this.categories[3]);
  }

  update() {
    this.selected = [this.categories[1], this.categories[3]];
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
    this.categories = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
