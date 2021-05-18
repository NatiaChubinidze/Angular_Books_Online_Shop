import { Component, OnInit } from '@angular/core';

import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss'],
})
export class BooksReadComponent implements OnInit {
  p: number = 1;
  private _searchTitle: string;
  private _searchAuthor: string;
  books: IFirebaseBook[];
  filteredBooks: IFirebaseBook[] = [];
  constructor(
    private _firebaseCrudService: FireBaseCrudService,
    private _firebaseAuthService: FirebaseAuthService
  ) {}

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
  deleteFromReadBooks(book: IFirebaseBook) {
    this._firebaseCrudService.deleteItem('books-read', book.id);
    this.filteredBooks = this.filteredBooks.filter(
      (item) => item.id !== book.id
    );
  }

  ngOnInit(): void {
    this._firebaseAuthService.currentUser$.subscribe((data) => {
      if (data) {
        this._firebaseAuthService.userUID = data.uid;
      }
    });
    this._firebaseCrudService
      .getCollection('books-read')
      .subscribe((books: any) => {
        if (books) {
          this.books = this.filteredBooks = this._firebaseCrudService.booksRead = books.filter(
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
  }
}
