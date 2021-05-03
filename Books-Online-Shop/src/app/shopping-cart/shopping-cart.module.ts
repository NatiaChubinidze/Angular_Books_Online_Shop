import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ShoppingCartComponent } from './shopping-cart.component';




@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,RouterModule
  ]
})
export class ShoppingCartModule { }
