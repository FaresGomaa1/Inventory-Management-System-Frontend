import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryManagerRoutingModule } from './inventory-manager-routing.module';
import { DecisionComponent } from './decision/decision.component';


@NgModule({
  declarations: [
    DecisionComponent
  ],
  imports: [
    CommonModule,
    InventoryManagerRoutingModule
  ]
})
export class InventoryManagerModule { }
