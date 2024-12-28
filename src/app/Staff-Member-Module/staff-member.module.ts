import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffMemberRoutingModule } from './staff-member-routing.module';
import { CreateRequestComponent } from './create-request/create-request.component';
import { FormsModule } from '@angular/forms';
import { UpdateRequestComponent } from './update-request/update-request.component';


@NgModule({
  declarations: [
    CreateRequestComponent,
    UpdateRequestComponent
  ],
  imports: [
    CommonModule,
    StaffMemberRoutingModule,
    FormsModule
  ]
})
export class StaffMemberModule { }
