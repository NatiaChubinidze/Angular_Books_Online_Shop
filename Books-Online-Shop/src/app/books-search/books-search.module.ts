import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { BooksSearchComponent } from './books-search.component';
import { BookCardsModule } from '../shared/components/book-cards.module';
import { AddHeaderInterceptorService } from './shared/services/add-header.interceptor';
import { HttpCacheInterceptor } from './shared/services/http-cache.interceptor';

@NgModule({
  declarations: [BooksSearchComponent],
  imports: [CommonModule, BookCardsModule, FormsModule, NgxPaginationModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
  ],
})
export class BooksSearchModule {}
