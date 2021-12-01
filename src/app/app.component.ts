import { Component } from '@angular/core';
import { AuthService } from 'src/app/public/auth/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn: boolean = this.authService.hasToken();
  constructor(private authService: AuthService) {}
}
