import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  categories!: Category[];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null, Validators.required],
      description: [null, Validators.required],
      parent: [null],
      image: [null, Validators.required],
    });

    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategories().subscribe(
      (response) => {
        console.log('getCategory sucessfully !');
        this.categories = response?.results;
      },
      (error) => console.log(error)
    );
  }
}
