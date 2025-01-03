import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryManagerRoutingModule } from './inventory-manager-routing.module';
import { DecisionComponent } from './decision/decision.component';


@NgModule({
  declarations: [
    DecisionComponent
  ],
  imports: [
    CommonModule,
    InventoryManagerRoutingModule,
    FormsModule
  ]
})
export class InventoryManagerModule { }
