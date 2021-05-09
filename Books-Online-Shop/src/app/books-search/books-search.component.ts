import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { BooksSearchService } from '../shared/services/books-search/books-search.service';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';
import { IBookSearchParams } from './shared/interfaces/book-search.interface';
import {
  IBooks,
  IBooksResponse,
} from './shared/interfaces/books-response.interface';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent implements OnInit {
  p: number = 1;
  activeCategory: string;
  categories: string[] = [
    'Mystery',
    'Science-fiction',
    'Detective',
    'Adventure',
    'Fiction',
  ];
  books: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  wishlist: IFirebaseBook[];
  shoppingCart: IFirebaseBook[];

  searchParams: IBookSearchParams = {};
  booksArray: IBooks[];
  constructor(
    private _bookService: BooksSearchService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _firebaseCrudService: FireBaseCrudService,
    private _firebaseAuthService: FirebaseAuthService
  ) {
    this.activeCategory = this._bookService.activeCategory;
  }

  ngOnInit(): void {
    const result: IBooksResponse = this._activeRoute.snapshot.data[
      'booksResponse'
    ];
    this.booksArray = result.items;
    this.searchParams = { ...this._bookService.searchParam };
    if (!this._bookService.searchParam.subject) {
      this.searchParams.subject = 'Choose Category';
    } else {
      this.searchParams.subject = this._bookService.searchParam.subject;
    }
    if (!this._bookService.searchParam.langRestrict) {
      this.searchParams.langRestrict = 'Choose Language';
    } else {
      this.searchParams.langRestrict = this._bookService.searchParam.langRestrict;
    }
    if (!this._bookService.searchParam.filter) {
      this.searchParams.filter = 'Filter by';
    } else {
      this.searchParams.filter = this._bookService.searchParam.filter;
    }
    if (!this._bookService.searchParam.orderBy) {
      this.searchParams.orderBy = 'Order by';
    } else {
      this.searchParams.orderBy = this._bookService.searchParam.orderBy;
    }

    this._firebaseAuthService.currentUser$.subscribe((data) => {
      if(data){
      this._firebaseAuthService.userUID = data.uid;
      }
    });
    this._firebaseCrudService
      .getCollection('wishlist')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.wishlist = books.filter(
            (item) => item.userUID === this._firebaseAuthService.userUID
          );
        }
      });
    this._firebaseCrudService
      .getCollection('shopping-cart')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.shoppingCart = books.filter(
            (item) => item.userUID === this._firebaseAuthService.userUID
          );
        }
      });
  }

  isInWishlist(book: IBooks) {
    let isInWishlist: boolean = false;
    if (this.wishlist) {
      this.wishlist.forEach((item) => {
        if (
          item.title
            .toLowerCase()
            .includes(book.volumeInfo.title.toLocaleLowerCase())
        ) {
          isInWishlist = true;
        }
      });
    }
    return isInWishlist;
  }
  isInShoppingCart(book: IBooks) {
    let isInShoppingCart: boolean = false;
    if (this.shoppingCart) {
      this.shoppingCart.forEach((item) => {
        if (
          item.title
            .toLowerCase()
            .includes(book.volumeInfo.title.toLocaleLowerCase())
        ) {
          isInShoppingCart = true;
        }
      });
    }
    return isInShoppingCart;
  }
  showBookDetails(book: IBooks) {
    this._bookService.activeBook = book;
    this._router.navigate(['/details']);
  }
  getFilteredBooks() {
    this.activeCategory = this._bookService.activeCategory = '';
    let refinedParams: IBookSearchParams = { ...this.searchParams };
    console.log(this.searchParams);
    if (refinedParams.subject === 'Choose Category') {
      refinedParams.subject = '';
    }
    if (refinedParams.langRestrict === 'Choose Language') {
      delete refinedParams.langRestrict;
    }
    if (refinedParams.filter === 'Filter by') {
      delete refinedParams.filter;
    }
    if (refinedParams.orderBy === 'Order by') {
      delete refinedParams.orderBy;
    }
    this._bookService.searchParam = { ...refinedParams };
    console.log(refinedParams);
    this._router.navigate([], {
      queryParamsHandling: '',
      replaceUrl: true,
      queryParams: refinedParams,
    });
    this._bookService.getFilteredBooks().subscribe((books: any) => {
      if(books && books.items!==undefined){
      this.booksArray = books.items;
      } else{
        this.booksArray=[];
      }
      
    });
  }
  getBooksByCategories(category: string) {
    this._bookService.activeCategory = this.activeCategory = category;
    const categorySearch = {
      subject: category,
    };
    this._router.navigate([], {
      queryParamsHandling: '',
      replaceUrl: true,
      queryParams: categorySearch,
    });
    this._bookService.getBooksByCategories().subscribe((books: any) => {
      this.booksArray = books.items;
    });
  }
  addToCart(book: IBooks) {
    let bookToAdd: IFirebaseBook;
    let category: string = '';
    if (book.volumeInfo.categories) {
      category = book.volumeInfo.categories[0];
    }
    if (book.saleInfo.retailPrice) {
      bookToAdd = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        priceAmount: book.saleInfo.retailPrice.amount,
        subject: category,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    } else {
      bookToAdd = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        subject: category,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    }
    console.log(bookToAdd);
    this._firebaseCrudService.saveItem('shopping-cart', bookToAdd);
  }
  addToWishlist(book: IBooks) {
    let bookToAdd: IFirebaseBook;
    let category: string = '';
    if (book.volumeInfo.categories) {
      category = book.volumeInfo.categories[0];
    }
    if (book.saleInfo.retailPrice) {
      bookToAdd = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        priceAmount: book.saleInfo.retailPrice.amount,
        subject: category,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    } else {
      bookToAdd = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        subject: category,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    }

    console.log(bookToAdd);
    this._firebaseCrudService.saveItem('wishlist', bookToAdd);
  }
}
