import { Component, OnInit } from '@angular/core';

import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';
import { WISHLIST_MAX_NUMBER } from '../shared/constants/wishlist-constants';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  p: number = 1;
  private _searchTitle: string;
  private _searchAuthor: string;
  books: IFirebaseBook[] = [];
  filteredBooks: IFirebaseBook[] = [];
  shoppingCart: IFirebaseBook[];
  wishist_items_max_number: number;
  constructor(
    private _firebaseCrudService: FireBaseCrudService,
    private _firebaseAuthService: FirebaseAuthService
  ) {
    this.wishist_items_max_number = WISHLIST_MAX_NUMBER;
  }

  get searchTitle(): string {
    return this._searchTitle;
  }
  get searchAuthor(): string {
    return this._searchAuthor;
  }
  set searchTitle(value: string) {
    this._searchTitle = value;
    if (this._searchTitle) {
      this.filteredBooks = this.books.filter((book) => {
        return book.title
          .toLowerCase()
          .includes(this._searchTitle.toLowerCase());
      });
    } else {
      this.filteredBooks = this.books.slice();
    }
  }
  set searchAuthor(value: string) {
    this._searchAuthor = value;
    if (this._searchAuthor) {
      this.filteredBooks = this.books.filter((book) =>
        book.author.toLowerCase().includes(this._searchAuthor.toLowerCase())
      );
    } else {
      this.filteredBooks = this.books.slice();
    }
  }

  addToRead(book: IFirebaseBook) {
    let bookToAdd: IFirebaseBook;
    if (book.priceAmount) {
      bookToAdd = {
        title: book.title,
        author: book.author,
        price: book.price,
        priceAmount: book.priceAmount,
        thumbnail: book.thumbnail,
        subject: book.subject,
        quantity: book.quantity,
        userUID: this._firebaseAuthService.userUID,
      };
    } else {
      bookToAdd = {
        title: book.title,
        author: book.author,
        price: book.price,
        thumbnail: book.thumbnail,
        subject: book.subject,
        quantity: book.quantity,
        userUID: this._firebaseAuthService.userUID,
      };
    }
    this._firebaseCrudService.saveItem('books-read', bookToAdd);
    this._firebaseCrudService.deleteItem('wishlist', book.id);
    this.filteredBooks = this.filteredBooks.filter(
      (item) => item.id !== book.id
    );
  }
  addToCart(book: IFirebaseBook) {
    let bookToAdd: IFirebaseBook;
    if (book.priceAmount) {
      bookToAdd = {
        title: book.title,
        author: book.author,
        price: book.price,
        priceAmount: book.priceAmount,
        thumbnail: book.thumbnail,
        subject: book.subject,
        quantity: book.quantity,
        userUID: this._firebaseAuthService.userUID,
      };
    } else {
      bookToAdd = {
        title: book.title,
        author: book.author,
        price: book.price,
        thumbnail: book.thumbnail,
        subject: book.subject,
        quantity: book.quantity,
        userUID: this._firebaseAuthService.userUID,
      };
    }
    this._firebaseCrudService.saveItem('shopping-cart', bookToAdd);
  }
  deleteFromCart(book: IFirebaseBook) {
    if (this.shoppingCart) {
      this.shoppingCart.forEach((item) => {
        if (item.title === book.title) {
          if (!item.ordered) {
            this._firebaseCrudService.deleteItem('shopping-cart', item.id);
          }
        }
      });
    }
  }

  deleteFromWishlist(book: IFirebaseBook) {
    this._firebaseCrudService.deleteItem('wishlist', book.id);
    this.filteredBooks = this.filteredBooks.filter(
      (item) => item.id !== book.id
    );
  }

  isInShoppingCart(book: IFirebaseBook) {
    let isInShoppingCart: boolean = false;
    if (this.shoppingCart) {
      this.shoppingCart.forEach((item) => {
        if (item.title.toLowerCase().includes(book.title.toLocaleLowerCase())) {
          isInShoppingCart = true;
        }
      });
    }
    return isInShoppingCart;
  }

  ngOnInit(): void {
    this._firebaseAuthService.currentUser$.subscribe((data) => {
      if (data) {
        this._firebaseAuthService.userUID = data.uid;
      }
    });
    this._firebaseCrudService
      .getCollection('wishlist')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.books = this.filteredBooks = this._firebaseCrudService.wishlist = books.filter(
            (item) => item.userUID === this._firebaseAuthService.userUID
          );
        }
      });
    setTimeout(() => {
      if (this.books) {
        this.searchTitle = '';
        this.searchAuthor = '';
      }
    }, 1000);

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
}
