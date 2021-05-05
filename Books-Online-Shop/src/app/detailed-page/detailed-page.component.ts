import { Component, OnInit } from '@angular/core';

import { IBooks } from '../books-search/shared/interfaces/books-response.interface';
import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { BooksSearchService } from '../shared/services/books-search/books-search.service';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';
import { WISHLIST_MAX_NUMBER } from '../shared/constants/wishlist-constants';


@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss']
})
export class DetailedPageComponent implements OnInit {
  isInWishlist:boolean=false;
isWishlistLimitReached: boolean;
  constructor(public bookService:BooksSearchService, private _firebaseCrudService: FireBaseCrudService,private _firebaseAuthService: FirebaseAuthService) { }

  ngOnInit(): void {
    this._firebaseCrudService
      .getCollection('wishlist')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          const myWishlist = books.filter(
            (item) => item.userUID === this._firebaseAuthService.userUID
          );
          if (
            myWishlist.length > WISHLIST_MAX_NUMBER ||
           myWishlist.length === WISHLIST_MAX_NUMBER
          ) {
            this.isWishlistLimitReached = true;
          } else {
            this.isWishlistLimitReached = false;
          }
          if(this.bookService.activeBook){
          myWishlist.forEach(book=>{
            if(book.title===this.bookService.activeBook.volumeInfo.title){
              this.isInWishlist=true;
            }
          })
        }
        }
      });
  }
  addToCart() {
    console.log("adding to cart");
    const book:IBooks=this.bookService.activeBook;
    let bookToAdd: IFirebaseBook;
    if (book.saleInfo.retailPrice) {
      bookToAdd = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        priceAmount: book.saleInfo.retailPrice.amount,
        subject: book.volumeInfo.categories[0],
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    } else {
      bookToAdd= {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        subject: book.volumeInfo.categories[0],
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    }
    console.log(bookToAdd);
    this._firebaseCrudService.saveItem('shopping-cart', bookToAdd);
  }
  addToWishlist() {
    if(!this.isWishlistLimitReached){
    console.log("adding to wishlist");
    const book:IBooks=this.bookService.activeBook;
    let bookToAdd: IFirebaseBook;
    if (book.saleInfo.retailPrice) {
      bookToAdd = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        priceAmount: book.saleInfo.retailPrice.amount,
        subject: book.volumeInfo.categories[0],
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    } else {
      bookToAdd= {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        subject: book.volumeInfo.categories[0],
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    }
    
    console.log(bookToAdd);
    this._firebaseCrudService.saveItem('wishlist', bookToAdd);
  }
}
}
