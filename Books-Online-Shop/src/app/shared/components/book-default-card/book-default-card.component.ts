import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBooks } from 'src/app/books-search/shared/interfaces/books-response.interface';
import { ICardBook } from '../../interfaces/book.interface';

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

imgUrl:string;

  constructor() { }

  ngOnInit(): void {
    this.imgUrl=this.book?.volumeInfo.imageLinks?.thumbnail;
  }
  addToWishlist(){
    this.wishlistEvent.emit(this.book);
  }

  addToCart(){
    this.shoppingEvent.emit(this.book);
  }
  showBookDetails(){
    this.bookDetailsEvent.emit(this.book);
  }

}


