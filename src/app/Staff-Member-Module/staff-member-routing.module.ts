import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRequestComponent } from './create-request/create-request.component';
import { UpdateRequestComponent } from './update-request/update-request.component';

const routes: Routes = [
  {
    path: '',
    component: CreateRequestComponent,
  },
  {
    path: 'update-request/:id',
    component: UpdateRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffMemberRoutingModule {}
