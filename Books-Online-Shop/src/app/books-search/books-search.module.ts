import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksSearchComponent } from './books-search.component';
import { BookCardsModule } from '../shared/components/book-cards.module';



@NgModule({
  declarations: [BooksSearchComponent],
  imports: [
    CommonModule,BookCardsModule
  ]
})
 export class BooksSearchModule { }
