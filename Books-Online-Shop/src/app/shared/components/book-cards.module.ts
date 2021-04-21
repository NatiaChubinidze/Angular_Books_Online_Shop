import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardsComponent } from './book-cards/book-cards.component';
import { BookDefaultCardComponent } from './book-default-card/book-default-card.component';
import { WishlistCardComponent } from './wishlist-card/wishlist-card.component';




@NgModule({
  declarations: [BookCardsComponent,BookDefaultCardComponent,WishlistCardComponent],
  imports: [
    CommonModule
  ],
  exports:[BookCardsComponent,BookDefaultCardComponent,WishlistCardComponent]
})
export class BookCardsModule { }
