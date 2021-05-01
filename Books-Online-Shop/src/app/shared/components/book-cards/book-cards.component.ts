import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBooks } from 'src/app/books-search/shared/interfaces/books-response.interface';

@Component({
  selector: 'app-book-cards',
  templateUrl: './book-cards.component.html',
  styleUrls: ['./book-cards.component.scss']
})
export class BookCardsComponent implements OnInit {
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
