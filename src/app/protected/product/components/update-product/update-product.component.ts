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
import { FileService } from 'src/app/core/services/file/file.service';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  ToastNotificationInitializer,
} from '@costlydeveloper/ngx-awesome-popup';
import { File } from '../../models/file';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  id!: string;
  // productData!: Product;

  productData: Partial<Product> = {
    name: '',
  };
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

  updateProductForm!: FormGroup;
  // productId!: number;
  categories!: Category[];
  Sizes = Sizes;
  panelOpenState = true;
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
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService
      .getProductById(this.activeRoute.snapshot.params['id'])
      .subscribe(
        (response: any) => {
          this.productData = response.data;
          console.log('Product by slug', this.productData.slug);
          this.updateProductForm = this.formBuilder.group({
            name: [this.productData.name, Validators.required],
            slug: [this.productData.slug, Validators.required],
            category: [this.productData?.category, Validators.required],
            price: [this.productData.price, Validators.required],
            stock: [this.productData.quantity, Validators.required],
            description: [this.productData.description, Validators.required],
            colors: [this.productData.colors, Validators.required],
          });
        },
        (error) => {
          console.error(error);
        }
      );

    console.log('Test :', this.productData.name);

    this.getCategory();

    this.setColors();
  }

  // loadProductData() {
  //   this.updateProductForm.controls['name']?.setValue(this.productData.name);
  //   this.updateProductForm.controls['slug']?.patchValue(this.productData.slug);
  //   this.updateProductForm.controls['category']?.patchValue(
  //     this.productData.category
  //   );
  //   this.updateProductForm.controls['price']?.patchValue(
  //     this.productData.price
  //   );
  //   this.updateProductForm.controls['stock']?.patchValue(
  //     this.productData.quantity
  //   );
  //   this.updateProductForm.controls['description']?.patchValue(
  //     this.productData.description
  //   );
  // }

  colors(): FormArray {
    return this.updateProductForm.get('colors') as FormArray;
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
    let control = <FormArray>this.updateProductForm?.controls?.colors;
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

  updateProduct() {
    // const productPayload: Product = {
    //   name: this.updateProductForm.get('name')?.value,
    //   slug: this.updateProductForm.get('slug')?.value,
    //   category: this.updateProductForm.get('category')?.value,
    //   price: this.updateProductForm.get('price')?.value,
    //   quantity: this.updateProductForm.get('stock')?.value,
    //   description: this.updateProductForm.get('description')?.value,
    //   is_active: true,
    //   colors: [],
    // };

    this.productService.updateProduct(this.updateProductForm.value).subscribe(
      (response: any) => {
        console.log('Product updated !', response);
        // this.productId = response.data.colors;
        // console.log(this.productId);
        this.toastNotification(
          'Notification',
          'Product added sucessfully !',
          DialogLayoutDisplay.SUCCESS
        );
        this.router.navigate(['/product-lit']);
      },
      (error: any) => {
        console.error('Product not updated !', error);
        console.log(this.updateProductForm.value);
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
