import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IBooks } from 'src/app/books-search/shared/interfaces/books-response.interface';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from '../../services/firebase-crud/firebase-crud.service';
import { WISHLIST_MAX_NUMBER } from '../../constants/wishlist-constants';
import { IFirebaseBook } from '../../interfaces/firebase-book.interface';


@Component({
  selector: 'app-book-default-card',
  templateUrl: './book-default-card.component.html',
  styleUrls: ['./book-default-card.component.scss']
})
export class BookDefaultCardComponent implements OnInit {
@Input() book:IBooks;
@Input() isInWishlist:boolean;
@Input() isInShoppingCart:boolean;
@Output() wishlistEvent = new EventEmitter();
@Output() shoppingEvent = new EventEmitter();
@Output() bookDetailsEvent = new EventEmitter();
@Output() deleteFromWishlistEvent = new EventEmitter();
@Output() deleteFromShoppingEvent = new EventEmitter();

imgUrl:string;
isWishlistLimitReached: boolean;

  constructor(private _firebaseCrudService: FireBaseCrudService,
    private _firebaseAuthService: FirebaseAuthService) { }

  ngOnInit(): void {
    this.imgUrl=this.book?.volumeInfo.imageLinks?.thumbnail;
    this._firebaseAuthService.currentUser$.subscribe((data) => {
      if(data){
      this._firebaseAuthService.userUID = data.uid;
      }
    });
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
        }
      });
  }
  addToWishlist(){
    if(!this.isWishlistLimitReached && !this.isInWishlist){
      console.log("adding to wishlist");
    this.wishlistEvent.emit(this.book);
    }else if(this.isInWishlist){
      console.log("delete from wishlist event");
      this.deleteFromWishlistEvent.emit(this.book);
    }
  }

  addToCart(){
    if(!this.isInShoppingCart){
    this.shoppingEvent.emit(this.book);
    }else if(this.isInShoppingCart){
      console.log("delete from shopping event");
      this.deleteFromShoppingEvent.emit(this.book);
    }
  }
  showBookDetails(){
    this.bookDetailsEvent.emit(this.book);
  }

}


