import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoginAdmin } from '../../models/loginAdmin';
import { AuthService } from '../../services/auth/auth.service';
import {
  DialogLayoutDisplay,
  ToastNotificationInitializer,
  AppearanceAnimation,
  DisappearanceAnimation,
} from '@costlydeveloper/ngx-awesome-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
    });
  }

  login() {
    const loginPayload: LoginAdmin = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(loginPayload).subscribe(
      (response) => {
        this.authService.saveUserData(response);
        this.toastNotification(
          'Notification',
          'You login successfully !',
          DialogLayoutDisplay.SUCCESS
        );
        window.location.reload();
      },
      (error) => {
        console.log('Login error', error);
        this.toastNotification(
          'Notification',
          'Login or password incorrect !',
          DialogLayoutDisplay.DANGER
        );
      }
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
