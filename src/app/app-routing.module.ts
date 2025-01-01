import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckIfHasRole } from './guards/check-if-has-role.guard';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'views',
    loadChildren: () => import('./Views-Module/views.module').then((m) => m.ViewsModule),
    canActivate: [CheckIfHasRole],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./Admin-Module/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'staff-member',
    loadChildren: () =>
      import('./Staff-Member-Module/staff-member.module').then(
        (m) => m.StaffMemberModule
      ),
    //canActivate: [AuthGuard],
  },
  {
    path: 'inventory-manager/:id',
    loadChildren: () =>
      import('./Inventory-Manager-Module/inventory-manager.module').then(
        (m) => m.InventoryManagerModule
      ),
    //canActivate: [AuthGuard],
  },
  {
    path: 'department-manager',
    loadChildren: () =>
      import('./Department-Manager-Module/department-manager.module').then(
        (m) => m.DepartmentManagerModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
