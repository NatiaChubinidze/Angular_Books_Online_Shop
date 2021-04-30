import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import {Router} from '@angular/router';
import { BooksSearchService } from './shared/services/books-search/books-search.service';
import { IBookSearchParams } from './shared/interfaces/book-search.interface';
import { IBooks, IBooksResponse } from './shared/interfaces/books-response.interface';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent implements OnInit {
  categories: string[] = [
    'Mystery',
    'Science-fiction',
    'Detective',
    'Advanture',
    'Documentary',
  ];
  books: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  searchParams: IBookSearchParams = {
    subject: 'Choose Category',
    langRestrict: 'Choose Language',
    filter: 'Filter by',
    orderBy: 'Order by',
  };
  booksArray:IBooks[];
  constructor(private _bookService:BooksSearchService, private _router:Router) {}

  ngOnInit(): void {
    this._bookService.getBooks().subscribe((data:any)=>{
      console.log(data);
      this.booksArray=data.items;
    })
  }
  showBookDetails(book:IBooks){
    this._bookService.activeBook=book;
    this._router.navigate(['/details']);
  }
  getFilteredBooks(){
    this._bookService.searchParam={...this.searchParams};
  console.log(this.searchParams);
    this._bookService.getFilteredBooks().subscribe((books:any)=>{
      this.booksArray=books.items;
      console.log(this.booksArray);
      
    })
  }
  getBooksByCategories(category:string){
    this._bookService.activeCategory=category;
    this._bookService.getBooksByCategories().subscribe((books:any)=>{
      this.booksArray=books.items;
    })
  }
}
