import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FileService } from 'src/app/core/services/File/file.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  fileToUpload: File | null = null;
  categories!: Category[];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null, Validators.required],
      description: [null, Validators.required],
      parent: [null],
      image: [null, Validators.required],
    });

    this.getCategory();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileService.saveFile(this.fileToUpload!).subscribe(
      (data) => {
        // do something, if upload success
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addCategory() {
    const newCategory: Category = {
      name: this.categoryForm.get('name')?.value,
      slug: this.categoryForm.get('slug')?.value,
      description: this.categoryForm.get('description')?.value,
      parent: this.categoryForm.get('parent')?.value,
      image: this.categoryForm.get('image')?.value,
      is_active: true,
    };

    this.categoryService.saveCategory(newCategory).subscribe(
      (response) => console.log('addCategory sucessfully !'),
      (error) => console.error(error)
    );
  }

  getCategory() {
    this.categoryService.getCategories().subscribe(
      (response) => {
        console.log('getCategory sucessfully !');
        this.categories = response?.data;
      },
      (error) => console.log(error)
    );
  }
}
