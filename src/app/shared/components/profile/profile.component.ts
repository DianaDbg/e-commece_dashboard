import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { countries } from 'src/app/core/utils/country-data-store';
import { Gender } from '../../../core/enums/gender';
import { FileService } from 'src/app/core/services/file/file.service';
import { AddressService } from 'src/app/core/services/address/address.service';
import { Address } from '../../models/address/address';
import { User } from '../../models/user/user';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  genders = Gender;
  hide = true;
  uploadedFile!: File;
  fileId!: string | undefined;
  public countries = countries;
  adressId?: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private addressService: AddressService,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      first_name: new FormControl(),
      last_name: new FormControl(),
      username: new FormControl(),
      gender: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirm_password: new FormControl(),
      zipcode: new FormControl(),
      country: new FormControl(),
      state: new FormControl(),
      city: new FormControl(),
      street: new FormControl(),
      profile_picture: new FormControl(),
    });
  }

  handleFile(e: any) {
    this.uploadedFile = e.target.files[0];
  }

  saveFile() {
    let promise = Promise.resolve(
      this.fileService.saveFile(this.uploadedFile).subscribe(
        (response: any) => {
          this.fileId = response?.data?.id;
          console.log(response);
        },
        (err) => {
          console.error(err);
        }
      )
    );
    return promise;
  }

  saveAdress() {
    const adressPayload: Address = {
      name: `${this.userForm.get('first_name')?.value} ${
        this.userForm.get('last_name')?.value
      }`,
      state: this.userForm.get('state')?.value,
      street1: this.userForm.get('street')?.value,
      city: this.userForm.get('city')?.value,
      zip_code: this.userForm.get('zipcode')?.value,
      country: this.userForm.get('country')?.value,
      email: this.userForm.get('email')?.value,
    };

    let promise = Promise.resolve(
      this.addressService.saveAddress(adressPayload).subscribe(
        (response: any) => {
          this.adressId = response?.data?.id;
          console.log(this.adressId);
        },
        (error) => {
          console.log(error);
        }
      )
    );
    return promise;
  }

  updateProfile() {
    this.saveAdress()
      .then(() => {
        this.saveFile()
          .then(async () => {
            const userPayload: User = {
              username: this.userForm.get('username')?.value,
              password: this.userForm.get('password')?.value,
              email: this.userForm.get('email')?.value,
              first_name: this.userForm.get('first_name')?.value,
              last_name: this.userForm.get('last_name')?.value,
              gender: this.userForm.get('gender')?.value,
              address: await this.adressId,
              profile_picture: await this.fileId,
            };
            setTimeout(() => {
              this.UserService.updateUser(userPayload).subscribe(
                (response) => {
                  console.log(response);
                },
                (error) => {
                  console.error(error);
                }
              );
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
