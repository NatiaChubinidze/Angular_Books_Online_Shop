import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IFirebaseBook } from '../../interfaces/firebase-book.interface';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss']
})
export class WishlistCardComponent implements OnInit {
  @Input() book:IFirebaseBook;
  @Input() isInShoppingCart:boolean;
  @Output() readEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() shoppingEvent = new EventEmitter();
  @Output() deleteFromShoppingEvent = new EventEmitter();
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
    if(!this.isInShoppingCart){
    this.shoppingEvent.emit(this.book);
    }else if(this.isInShoppingCart){
      console.log("delete from shopping event");
      this.deleteFromShoppingEvent.emit(this.book);
    }
  }

}
