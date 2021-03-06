import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { IFirebaseBook } from '../../interfaces/firebase-book.interface';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class FireBaseCrudService {
  wishlist: IFirebaseBook[];
  booksRead: IFirebaseBook[];
  users: IUser[];
  errorMessage: string = '';
  constructor(private _firebaseStore: AngularFirestore) {}

  getCollection(collection: string) {
    this.errorMessage = '';

    return this._firebaseStore
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((doc) => {
            const data: any = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            return {
              id,
              ...data,
            };
          });
        }),
        catchError(this.handleError)
      );
  }

  deleteItem(collection: string, id: string) {
    this.errorMessage = '';
    try {
      return this._firebaseStore.collection(collection).doc(id).delete();
    } catch {
      (error) => {
        this.errorMessage = error;
      };
    }
  }

  saveItem(collection: string, item: any) {
    this.errorMessage = '';
    try {
      return this._firebaseStore.collection(collection).add(item);
    } catch {
      (error) => {
        this.errorMessage = error;
      };
    }
  }
  editItem(collection: string, id: string, data: any) {
    this.errorMessage = '';
    try {
      return this._firebaseStore.collection(collection).doc(id).update(data);
    } catch {
      (error) => {
        this.errorMessage = error;
        console.log(error);
      };
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `An error has occurred during the processing: ${error.error.message}`;
    } else {
      this.errorMessage = `Server returned the following error: ${error.status}. Error message: ${error.message}`;
    }
    return throwError(this.errorMessage);
  }
}
