import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { FileService } from 'src/app/core/services/File/file.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  AppearanceAnimation,
  DisappearanceAnimation,
} from '@costlydeveloper/ngx-awesome-popup';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  fileToUpload: File | null = null;
  fileUploadedId!: string;
  categories!: Category[];
  public animation: boolean = false;
  public multiple: boolean = false;

  private filesControl = new FormControl(
    null,
    FileUploadValidators.filesLimit(2)
  );

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
      image: this.filesControl,
    });

    this.getCategory();
  }

  uploadFileToActivity() {
    console.log('File controle : ', this.filesControl.value[0]);
    let promise = Promise.resolve(
      this.fileService.saveFile(this.filesControl.value[0]).subscribe(
        (response: any) => {
          this.fileUploadedId = response?.data?.id;
          console.log('File uploaded sucessfully !', this.fileUploadedId);
        },
        (error) => {
          console.error('Upload file error !', error);
        }
      )
    );
    return promise;
  }

  addCategory() {
    this.uploadFileToActivity().then(() => {
      const newCategory: Category = {
        name: this.categoryForm.get('name')?.value,
        slug: this.categoryForm.get('slug')?.value,
        description: this.categoryForm.get('description')?.value,
        parent: this.categoryForm.get('parent')?.value,
        image: this.fileUploadedId,
        is_active: true,
      };

      this.categoryService.saveCategory(newCategory).subscribe(
        (response) => {
          console.log('addCategory sucessfully !');
          this.categories.push(newCategory);
          this.toastNotification(
            'Notification',
            'Category added sucessfully !',
            DialogLayoutDisplay.SUCCESS
          );
        },

        (error) => {
          this.toastNotification(
            'Notification',
            'Category not added !',
            DialogLayoutDisplay.DANGER
          );
          console.error(error);
        }
      );
    });
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

  toastNotification(
    title: string,
    message: string,
    status: DialogLayoutDisplay
  ) {
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle(title);
    newToastNotification.setMessage(message);

    newToastNotification.setConfig({
      LayoutType: status, // SUCCESS | INFO | NONE | DANGER | WARNING
      AnimationIn: AppearanceAnimation.ELASTIC,
      AnimationOut: DisappearanceAnimation.FLIP_OUT,
    });

    newToastNotification.openToastNotification$();
  }
}
