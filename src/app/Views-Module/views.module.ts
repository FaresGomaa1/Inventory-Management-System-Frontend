import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; 

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views/views.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainViewComponent } from './main-view/main-view.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CreateSupplierComponent } from './create-supplier/create-supplier.component';


@NgModule({
  declarations: [
    ViewsComponent,
    SidebarComponent,
    MainViewComponent,
    ProductsComponent,
    ProductDetailsComponent,
    SupplierComponent,
    SuppliersComponent,
    CreateSupplierComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ]
})
export class ViewsModule { }
