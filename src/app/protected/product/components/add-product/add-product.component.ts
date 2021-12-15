import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Sizes } from 'src/app/core/enums/sizes';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { FileService } from 'src/app/core/services/File/file.service';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  ToastNotificationInitializer,
} from '@costlydeveloper/ngx-awesome-popup';
import { File } from '../../models/file';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  data = {
    name: [''],
    slug: [''],
    category: [''],
    price: [0],
    stock: [0],
    description: [''],
    colors: [
      {
        name: [''],
        code: [''],
        sizes: [
          {
            size: [''],
            quantity: [0],
          },
        ],
        images: null,
      },
    ],
  };
  productForm!: FormGroup;
  productId!: number;
  categories!: Category[];
  Sizes = Sizes;
  panelOpenState = false;
  fileToUpload: File | null = null;
  public animation: boolean = false;
  public multiple: boolean = true;

  private filesControl = new FormControl(
    null,
    FileUploadValidators.filesLimit(4)
  );

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private fileService: FileService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null],
      category: [null, Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      description: [null, Validators.required],
      colors: this.formBuilder.array([]),
    });

    console.log(this.productForm.controls.colors);

    this.getCategory();
    this.setColors();
  }

  colors(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  addColor() {
    this.colors().push(
      this.formBuilder.group({
        name: [''],
        code: [''],
        sizes: this.formBuilder.array([]),
        images: null,
      })
    );
  }

  removeColor(colorIndex: number) {
    this.colors().removeAt(colorIndex);
  }

  async setColors() {
    let control = <FormArray>this.productForm?.controls?.colors;
    await this.data?.colors?.forEach((x: any) => {
      control.push(
        this.formBuilder.group({
          name: x.name,
          code: x.code,
          sizes: this.setSize(x),
          images: x.images,
        })
      );
    });
  }

  colorsSizes(colorIndex: number): FormArray {
    return this.colors()?.at(colorIndex)?.get('sizes') as FormArray;
  }

  async addSize(index: number) {
    this.colorsSizes(index).push(
      this.formBuilder.group({
        size: [''],
        quantity: [0],
      })
    );
  }

  showFileToUp() {
    console.log(this.filesControl);
  }

  setSize(x: any) {
    let array = new FormArray([]);
    x.sizes.forEach((y: any) => {
      array.push(
        this.formBuilder.group({
          size: y.size,
          quantity: y.quantity,
        })
      );
    });
    return array;
  }

  removeSize(colorIndex: number, sizeIndex: number) {
    this.colorsSizes(colorIndex).removeAt(sizeIndex);
  }

  uploadProductImages() {
    const productsImagesPayload: File = {
      file: '',
    };
  }

  addProduct() {
    // const productPayload: Product = {
    //   name: this.productForm.get('name')?.value,
    //   slug: this.productForm.get('slug')?.value,
    //   category: this.productForm.get('category')?.value,
    //   price: this.productForm.get('price')?.value,
    //   quantity: this.productForm.get('stock')?.value,
    //   description: this.productForm.get('description')?.value,
    //   is_active: true,
    //   colors: [],
    // };

    this.productService.createProduct(this.productForm.value).subscribe(
      (response: any) => {
        console.log('Product saved !', response);
        // this.productId = response.data.colors;
        console.log(this.productId);
        this.toastNotification(
          'Notification',
          'Product added sucessfully !',
          DialogLayoutDisplay.SUCCESS
        );
      },
      (error: any) => {
        console.error('Product not saved !', error);
        console.log(this.productForm.value);
        this.toastNotification(
          'Notification',
          'Product not added !',
          DialogLayoutDisplay.DANGER
        );
      }
    );
  }

  getCategory() {
    this.categoryService.getCategories().subscribe(
      (response) => {
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
