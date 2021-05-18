import { Injectable } from '@angular/core';

import { IFirebaseBook } from 'src/app/shared/interfaces/firebase-book.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { FireBaseCrudService } from 'src/app/shared/services/firebase-crud/firebase-crud.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  wishlist: IFirebaseBook[];
  shoppingList: IFirebaseBook[];
  readBooksList: IFirebaseBook[];
  usersList: IUser[];
  activeUser: IUser;
  constructor(private _firebaseCrudService: FireBaseCrudService) {}

  getWishlists() {
    this._firebaseCrudService
      .getCollection('wishlist')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.wishlist = books;
        }
      });
  }

  getShoppingLists() {
    this._firebaseCrudService
      .getCollection('shopping-cart')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.shoppingList = books;
        }
      });
  }

  getBooksRead() {
    this._firebaseCrudService
      .getCollection('books-read')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.readBooksList = books;
        }
      });
  }

  getUsers() {
    this._firebaseCrudService
      .getCollection('users')
      .subscribe((users: IUser[]) => {
        if (users) {
          this.usersList = users;
        }
      });
  }
}
