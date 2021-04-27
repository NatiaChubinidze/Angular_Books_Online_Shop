import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksReadComponent } from './books-read.component';
import { BookCardsModule } from '../shared/components/book-cards.module';



@NgModule({
  declarations: [BooksReadComponent],
  imports: [
    CommonModule,
    BookCardsModule
  ]
})
export class BooksReadModule { }
