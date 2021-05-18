import { Component, OnInit } from '@angular/core';

import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  p: number = 1;
  shoppingList: IFirebaseBook[];
  shoppingItemsWithPrice: IFirebaseBook[];
  totalPrice: number = 0;
  newOrder: boolean = false;

  constructor(
    private _firebaseCrudService: FireBaseCrudService,
    private _firebaseAuthService: FirebaseAuthService
  ) {}

  ngOnInit(): void {
    this._firebaseCrudService
      .getCollection('shopping-cart')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.totalPrice = 0;
          this._firebaseAuthService.currentUser$.subscribe((data) => {
            if (data) {
              this._firebaseAuthService.userUID = data.uid;
            }
            this.shoppingList = books.filter((item) => {
              return (
                item.userUID === this._firebaseAuthService.userUID &&
                item.ordered !== 'ordered'
              );
            });
            this.shoppingItemsWithPrice = this.shoppingList.filter(
              (item) => item.price.toLowerCase() === 'for_sale'
            );
            this.shoppingItemsWithPrice.forEach((item) => {
              this.totalPrice += item.quantity * item.priceAmount;
            });
          });
        }
      });
  }

  incrementQuantity(item: IFirebaseBook) {
    item.quantity += 1;
    this._firebaseCrudService.editItem('shopping-cart', item.id, {
      quantity: item.quantity,
    });
  }
  decrementQuantity(item: IFirebaseBook) {
    if (item.quantity !== 1) {
      item.quantity -= 1;
      this._firebaseCrudService.editItem('shopping-cart', item.id, {
        quantity: item.quantity,
      });
    }
  }
  deleteItem(item: IFirebaseBook) {
    this._firebaseCrudService.deleteItem('shopping-cart', item.id);
  }
  order() {
    this.newOrder = true;
    this.shoppingList.forEach((item) => {
      this._firebaseCrudService.editItem('shopping-cart', item.id, {
        ordered: 'ordered',
      });
    });
    // setTimeout(() => {
    //   this.newOrder=false;
    // }, 10000);
  }
}
