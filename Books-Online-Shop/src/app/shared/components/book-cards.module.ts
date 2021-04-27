import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardsComponent } from './book-cards/book-cards.component';
import { BookDefaultCardComponent } from './book-default-card/book-default-card.component';
import { WishlistCardComponent } from './wishlist-card/wishlist-card.component';
import { BooksReadCardComponent } from './books-read-card/books-read-card.component';




@NgModule({
  declarations: [BookCardsComponent,BookDefaultCardComponent,WishlistCardComponent,BooksReadCardComponent],
  imports: [
    CommonModule
  ],
  exports:[BookCardsComponent,BookDefaultCardComponent,WishlistCardComponent,BooksReadCardComponent]
})
export class BookCardsModule { }
