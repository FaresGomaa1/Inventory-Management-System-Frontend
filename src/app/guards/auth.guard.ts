import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtPayload } from 'src/interfaces/IJWT';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // Define route constants
  private readonly ROUTES = {
    staffMember: '/staff-member',
    inventoryManager: '/inventory-manager',
    departmentManager: '/department-manager',
    default: '/',
  };

  // Define role constants
  private readonly ROLES = {
    staff: ['Staff Member', 'Staff Member Manager'],
    inventory: ['Inventory Manager', 'Inventory Manager Manager'],
    department: ['Department Manager', 'Department Manager Manager'],
  };

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token: JwtPayload = this.authService.getToken();
    const role =
      token?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (!role) {
      console.error('Access denied: User role not found in token.');
      this.router.navigate([this.ROUTES.default]);
      return false;
    }

    if (this.ROLES.staff.includes(role)) {
      this.router.navigate([this.ROUTES.staffMember]);
      return true;
    }

    if (this.ROLES.inventory.includes(role)) {
      this.router.navigate([this.ROUTES.inventoryManager]);
      return true;
    }

    if (this.ROLES.department.includes(role)) {
      this.router.navigate([this.ROUTES.departmentManager]);
      return true;
    }

    console.warn(`Access denied: Unhandled role '${role}'`);
    this.router.navigate([this.ROUTES.default]);
    return false;
  }
}