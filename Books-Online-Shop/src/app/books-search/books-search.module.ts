import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BooksSearchComponent } from './books-search.component';
import { BookCardsModule } from '../shared/components/book-cards.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptorService } from './shared/services/add-header.interceptor';

@NgModule({
  declarations: [BooksSearchComponent],
  imports: [CommonModule, BookCardsModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptorService,
      multi: true,
    },
  ],
})
export class BooksSearchModule {}
