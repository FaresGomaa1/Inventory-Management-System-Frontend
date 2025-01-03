import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss','../main-view/main-view.component.scss']
})
export class SidebarComponent {
  isTokenExpired: boolean = false;
  role: string = '';
  userName:string ="";
  constructor(private authService: AuthService, private router: Router) {
    this.checkSignIn();
  }
  signOut() {
    this.authService.signOut();
    window.location.reload();
  }

  checkSignIn() {
    this.isTokenExpired = this.authService.isTokenExpired();
    this.role =
      this.authService.getToken()[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];

    if (!this.isTokenExpired && this.role){
      this.userName = this.authService.getToken().sub
      this.router.navigate(['/views']);
    }else {
      this.router.navigate(['/']);
    }
  }
}
