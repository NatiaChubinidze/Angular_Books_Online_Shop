import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBooks } from '../books-search/shared/interfaces/books-response.interface';
import { BooksSearchService } from '../shared/services/books-search/books-search.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';
import {IFirebaseBook} from '../shared/interfaces/firebase-book.interface';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  categories: string[] = [
    'Fantasy',
    'Science-fiction',
    'Romance',
    'Detective',
    'Advanture',
    'Documentary',
    'Fiction',
    'Mystery',
  ];
  popularBooks: IBooks[];
  constructor(
    private _bookService: BooksSearchService,
    private _router: Router,
    private _firebaseCrudService:FireBaseCrudService
  ) {}

  ngOnInit(): void {
    this._bookService.getPopularBooks('fiction').subscribe((data: any) => {
      this.popularBooks = data.items;
    });
  }

  getBooksByCategory(category: string) {
    this._bookService.activeCategory = category;
    this._router.navigate(['/book-search']);
  }
  addToCart(book:IBooks){
    const bookToAdd:IFirebaseBook={
      title:book.volumeInfo.title,
      author:book.volumeInfo.authors[0],
      price:book.saleInfo.saleability,
      subject:book.volumeInfo.categories[0],
      thumbnail:book.volumeInfo.imageLinks.thumbnail,
      quantity:1,
    }
    this._firebaseCrudService.saveItem("shopping-cart",bookToAdd);
  }
  addToWishlist(book:IBooks){
    const bookToAdd:IFirebaseBook={
      title:book.volumeInfo.title,
      author:book.volumeInfo.authors[0],
      price:book.saleInfo.saleability,
      subject:book.volumeInfo.categories[0],
      thumbnail:book.volumeInfo.imageLinks.thumbnail,
      quantity:1,
    }
    this._firebaseCrudService.saveItem("wishlist",bookToAdd);
  }
}
