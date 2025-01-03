import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewsComponent } from './views/views.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'views',
        pathMatch: 'full',
      },
      {
        path: 'views',
        component: ViewsComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'product/:sku',
        component: ProductDetailsComponent,
      },
      {
        path: 'supplier/:id',
        component: SupplierComponent,
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
      },
      {
        path: 'create-supplier',
        component: CreateSupplierComponent,
      },
      {
        path: 'staff-member',
        loadChildren: () =>
          import('../Staff-Member-Module/staff-member.module').then(
            (m) => m.StaffMemberModule
          ),
        //canActivate: [AuthGuard],
      },
      {
        path: 'inventory-manager/:id',
        loadChildren: () =>
          import('../Inventory-Manager-Module/inventory-manager.module').then(
            (m) => m.InventoryManagerModule
          ),
        //canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
