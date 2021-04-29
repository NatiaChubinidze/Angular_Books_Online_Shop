import { Component, OnInit } from '@angular/core';
import { BooksSearchService } from './shared/services/books-search/books-search.service';
import { IBookSearchParams } from './shared/interfaces/book-search.interface';
import { IBooks } from './shared/interfaces/books-response.interface';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent implements OnInit {
  categories: string[] = [
    'fantasy',
    'science-fiction',
    'detective',
    'advanture',
    'documentary',
  ];
  books: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  searchParams: IBookSearchParams = {
    category: 'Choose Category',
    language: 'Choose Language',
    filterBy: 'Filter by',
    orderBy: 'Order by',
  };
  booksArray:IBooks[];
  constructor(private _bookService:BooksSearchService) {}

  ngOnInit(): void {
    this._bookService.getArticles().subscribe((data:any)=>{
      console.log(data);
      this.booksArray=data.items;
    })
  }
}
