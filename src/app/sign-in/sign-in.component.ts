import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtPayload } from 'src/interfaces/IJWT';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.errorMessage = "";

    if (!this.username || !this.password) {
      this.errorMessage = "You need to insert username and password"
      this.isLoading = true;
    }
    if(emailRegex.test(this.username)){
      this.email = this.username
      this.username = '';
      this.password = '';
    }
    this.authService
    .signIn(this.email, this.username, this.password)
    .subscribe({
      next: () => {
        this.isLoading = false;
        console.log("Here");
        this.router.navigate(["/views"]);
      },
      error: (error) => {
        console.error("Sign-in error:", error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || "An unexpected error occurred. Please try again.";
      },
    });
  
  }
}
