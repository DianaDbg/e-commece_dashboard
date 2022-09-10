import { Component, Input, ViewChild, OnInit } from '@angular/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category/category.service';
import {
  DialogLayoutDisplay,
  ConfirmBoxInitializer,
} from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @Input()
  categories!: Category[];
  categoryId!: string;

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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.temp = this.categories;
  }

  onSelect({ selected }: any) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
    this.categoryId = event?.row?.id;
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

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        console.log('Category Deleted !');
        this.categories = this.categories.filter((item) => item.id != id);
      },
      () => {
        console.log('Category not Deleted !');
      }
    );
  }

  confirmBox() {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure?');
    confirmBox.setMessage('Confirm to delete this category !');
    confirmBox.setButtonLabels('YES', 'NO');

    confirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.DANGER,
    });

    confirmBox.openConfirmBox$().subscribe((response) => {
      console.log('Clicked button response: ', response);
      if (response.Success) {
        this.deleteCategory(this.categoryId);
      }
    });
  }
}
