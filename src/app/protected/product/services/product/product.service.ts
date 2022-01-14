import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../../../public/auth/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Color } from '../../models/color';
import { ColorService } from '../../../../core/services/color/color.service';
import { File } from '../../models/file';
import { FileService } from '../../../../core/services/File/file.service';
import { Response } from '../../../../shared/models/response/response';
import { Product } from '../../models/product';
import { ColorDto, ProductForm } from '../../ProductDto/ProductDto';
import { SizeService } from 'src/app/core/services/size/size.service';
declare var ntc: any;
import '../../../../core/utils/ntc.js';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly baseUrl = environment.baseUrl + 'products';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private fileService: FileService,
    private sizeService: SizeService,
    private colorService: ColorService
  ) {}
  // UTILS
  getFirstImage(product: Product) {
    let file: string = '...';
    if (typeof product.colors[0] === 'object') {
      file = (<File>product.colors[0].images[0]).file;
    }
    return file;
  }
  //HTTP REQUESTS
  getProducts(url?: string) {
    return this.httpClient.get<Response<Product[]>>(url ? url : this.baseUrl);
  }
  getProductById(id: string) {
    return this.httpClient.get<Response<Product>>(this.baseUrl + '/' + id);
  }

  saveProduct(product: Product) {
    return this.httpClient.post<Product>(
      this.baseUrl,
      {
        ...product,
        created_by: this.authService.getId(),
      },
      {
        headers: new HttpHeaders({
          Authorization: 'token ' + this.authService.getToken(),
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  checkNtc() {
    console.log('Ntc :', ntc);
  }

  updateProduct(product: Product) {
    return this.httpClient.put(this.baseUrl + '/' + product.id, product, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(this.baseUrl + '/' + id, {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      }),
    });
  }

  uploadPoductFile(colorForm: any, color: any) {
    let promise = Promise.resolve(
      colorForm.images.forEach((image: any) => {
        this.fileService.saveFile(image).subscribe((file: any) => {
          color.images.push(file?.data?.id);
          console.log('File :', color);
        });
      })
    );
    return promise;
  }

  createSize(colorForm: any, color: any) {
    let promise = Promise.resolve(
      colorForm.sizes.forEach((size: any) => {
        this.sizeService.saveSize(size).subscribe((response: any) => {
          color.sizes.push(response.data.id!);
          console.log('Size:', color);
        });
      })
    );
    return promise;
  }

  createColor(productForm: ProductForm, product: Product, userId: string) {
    let promise = Promise.resolve(
      productForm.colors.forEach(async (colorForm) => {
        let n_match = ntc.name(colorForm.code);

        console.log(n_match[3]);

        const color: Color = {
          name: n_match[3],
          code: colorForm.code,
          sizes: [],
          images: [],
          created_by: userId,
        };

        this.uploadPoductFile(colorForm, color).then(() => {
          this.createSize(colorForm, color);
          console.log('Before save color', color);
          this.colorService.saveColor(color).subscribe((response: any) => {
            product.colors = [...product.colors, response.data.id!];
            console.log('After save color : ', product.colors);
          });
        });
      })
    );
    return promise;
  }

  createProduct(productForm: ProductForm) {
    const userId = this.authService.getId();

    let product: Product = {
      name: productForm.name,
      description: productForm.description,
      slug: productForm.slug,
      is_active: true,
      price: productForm.price,
      quantity: 1, // will be computed with size quantity
      created_by: userId,
      category: productForm.category,
      colors: [],
    };

    return this.createColor(productForm, product, userId).then((item: any) => {
      return this.httpClient.post<Product>(
        this.baseUrl,
        {
          ...item.product,
          created_by: this.authService.getId(),
        },
        {
          headers: new HttpHeaders({
            Authorization: 'token ' + this.authService.getToken(),
            'Content-Type': 'application/json',
          }),
        }
      );
    });
    // console.log('Before create product', product);
    // this.saveProduct(product).subscribe((response) =>
    //   console.log('After save product :', response)
    // );
    // return this.httpClient.post<Product>(
    //   this.baseUrl,
    //   {
    //     ...product,
    //     created_by: this.authService.getId(),
    //   },
    //   {
    //     headers: new HttpHeaders({
    //       Authorization: 'token ' + this.authService.getToken(),
    //       'Content-Type': 'application/json',
    //     }),
    //   }
    // );
  }
}
