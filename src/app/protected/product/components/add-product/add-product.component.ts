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
import { SizeService } from 'src/app/core/services/size/size.service';
import { ColorService } from '../../../../core/services/color/color.service';
import { Product } from '../../models/product';
import {
  AppearanceAnimation,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  ToastNotificationInitializer,
} from '@costlydeveloper/ngx-awesome-popup';
import { File } from '../../models/file';
import { Router } from '@angular/router';
declare var ntc: any;
import '../../../../core/utils/ntc.js';
import { Color } from '../../models/color';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';
import { Size } from '../../models/size';

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
  colors_: Color[] = [];
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
    private productService: ProductService,
    private router: Router,
    private sizeService: SizeService,
    private colorService: ColorService,
    private authService: AuthService
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

  // uploadProductImages() {
  //   const productsImagesPayload: File = {
  //     file: '',
  //   };
  // }

  uploadPoductFile(color: Color) {
    const images_: File[] = [];
    color?.images?.forEach((image: any) => {
      this.fileService.saveFile(image).subscribe((file: any) => {
        images_.push(file?.data?.id);
        console.log(images_);
      });
    });
    return images_;
  }

  // uploadPoductFile(colorForm: any, color: any) {
  //   let promise = Promise.resolve(
  //     colorForm.images.forEach((image: any) => {
  //       this.fileService.saveFile(image).subscribe((file: any) => {
  //         color.images.push(file?.data?.id);
  //         console.log('File :', color);
  //       });
  //     })
  //   );
  //   return promise;
  // }

  creativeSize(color: Color) {
    const sizes_: Size[] = [];
    color?.sizes?.forEach((size: any) => {
      this.sizeService.saveSize(size).subscribe((response: any) => {
        sizes_.push(response.data.id!);
        console.log(sizes_);
      });
    });
    return sizes_;
  }

  // createSize(colorForm: any, color: any) {
  //   let promise = Promise.resolve(
  //     colorForm.sizes.forEach((size: any) => {
  //       this.sizeService.saveSize(size).subscribe((response: any) => {
  //         color.sizes.push(response.data.id!);
  //         console.log('Size:', color);
  //       });
  //     })
  //   );
  //   return promise;
  // }

  // createSize(colorForm: any, color: any) {
  //   let promise = Promise.resolve(
  //     colorForm.sizes.forEach((size: any) => {
  //       this.sizeService.saveSize(size).subscribe((response: any) => {
  //         color.sizes.push(response.data.id!);
  //         console.log('Size:', color);
  //       });
  //     })
  //   );
  //   return promise;
  // }

  // createColor(productForm: ProductForm, product: Product, userId: string) {
  //   let promise = Promise.resolve(
  //     productForm.colors.forEach(async (colorForm) => {
  //       let n_match = ntc.name(colorForm.code);

  //       console.log(n_match[3]);

  //       const color: ColorDto = {
  //         name: n_match[3],
  //         code: colorForm.code,
  //         sizes: [],
  //         images: [],
  //         created_by: userId,
  //       };

  //       this.uploadPoductFile(colorForm, color).then(() => {
  //         this.createSize(colorForm, color);
  //         console.log('Before save color', color);
  //         this.colorService.saveColor(color).subscribe((response: any) => {
  //           product.colors = [...product.colors, response.data.id!];
  //           console.log('After save color : ', product.colors);
  //         });
  //       });
  //     })
  //   );
  //   return promise;
  // }

  createColor(colors: Color[]) {
    let promise = Promise.resolve(
      colors.forEach(async (color: Color) => {
        let n_match = ntc.name(color.code);
        color.name = n_match[3];
        color.images = await this.uploadPoductFile(color);
        color.sizes = this.creativeSize(color);
        setTimeout(() => {
          this.colorService.saveColor(color).subscribe((response: any) => {
            this.colors_ = [...this.colors_, response.data.id];
          });
        }, 1000);
      })
    );
    return promise;
  }

  async addProduct() {
    const _colors: Color[] = this.productForm?.value?.colors;

    await this.createColor(_colors).then(() => {
      const userId = this.authService.getId();
      setTimeout(async () => {
        const productPayload: Product = {
          name: this.productForm.get('name')?.value,
          slug: this.productForm.get('slug')?.value,
          category: this.productForm.get('category')?.value,
          price: this.productForm.get('price')?.value,
          quantity: this.productForm.get('stock')?.value,
          description: this.productForm.get('description')?.value,
          is_active: true,
          colors: this.colors_,
        };

        await this.productService.saveProduct(productPayload).subscribe(
          (response: any) => {
            console.log('Product saved !', response);
            // this.productId = response.data.colors;
            console.log(this.productId);
            this.router.navigate(['/product-list']);
            // window.location.reload();
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
      }, 1500);
    });
    // const _sizes: Size[] = _colors?.sizes;
    // const _files: File[] = this.productForm?.value?.colors?.images;

    // let n_match = ntc.name(colorForm.code);
    // const colorPayload: Color[] = {
    //   name: n_match[3],
    //   code: colorForm.code,
    //   sizes: [],
    //   images: [],
    //   created_by: userId,
    // };
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
