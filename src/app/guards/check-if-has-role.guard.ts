import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { JwtPayload } from 'src/interfaces/IJWT';

@Injectable({
  providedIn: 'root',
})
export class CheckIfHasRole implements CanActivate {

  // Define the allowed roles
  private readonly ALLOWED_ROLES = [
    'Staff Member',
    'Staff Member Manager',
    'Inventory Manager',
    'Inventory Manager Manager',
    'Department Manager',
    'Department Manager Manager',
  ];

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token: JwtPayload = this.authService.getToken();
    const role = token?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (this.ALLOWED_ROLES.includes(role)) {
      return true;
    }

    console.error(`Access denied: Unauthorized role '${role}'`);
    this.router.navigate(['/']); 
    return false;
  }
}
