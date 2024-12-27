import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffMemberRoutingModule } from './staff-member-routing.module';
import { CreateRequestComponent } from './create-request/create-request.component';


@NgModule({
  declarations: [
    CreateRequestComponent
  ],
  imports: [
    CommonModule,
    StaffMemberRoutingModule
  ]
})
export class StaffMemberModule { }
