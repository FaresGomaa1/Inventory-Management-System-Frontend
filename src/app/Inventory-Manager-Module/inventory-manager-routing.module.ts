import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecisionComponent } from './decision/decision.component';

const routes: Routes = [
    {
      path: '',
      component: DecisionComponent,
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryManagerRoutingModule { }
