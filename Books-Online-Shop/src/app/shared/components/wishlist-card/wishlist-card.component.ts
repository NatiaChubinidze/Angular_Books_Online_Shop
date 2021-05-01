import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBooks } from 'src/app/books-search/shared/interfaces/books-response.interface';
import { IFirebaseBook } from '../../interfaces/firebase-book.interface';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss']
})
export class WishlistCardComponent implements OnInit {
  @Input() book:IFirebaseBook;
  @Output() readEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() shoppingEvent = new EventEmitter();
  imgUrl:string;
  constructor() { }

  ngOnInit(): void {
    this.imgUrl=this.book?.thumbnail;
  }

  addToReadBooks(){
    this.readEvent.emit(this.book);
  }

  removeFromWishlist(){
    this.deleteEvent.emit(this.book);
  }
  addToShoppingCart(){
    this.shoppingEvent.emit(this.book);
  }

}
