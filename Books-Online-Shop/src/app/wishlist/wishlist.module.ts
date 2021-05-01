import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WishlistComponent } from './wishlist.component';
import { BookCardsModule } from '../shared/components/book-cards.module';




@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,BookCardsModule,FormsModule
  ]
})
export class WishlistModule { }
