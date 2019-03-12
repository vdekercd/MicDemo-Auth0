import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public auth: AuthService, public router: Router) {
    this.auth.handleAuthentication();

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }

  }
}
