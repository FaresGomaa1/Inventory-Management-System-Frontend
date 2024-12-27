import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views/views.component';


@NgModule({
  declarations: [
    ViewsComponent,
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule
  ]
})
export class ViewsModule { }
