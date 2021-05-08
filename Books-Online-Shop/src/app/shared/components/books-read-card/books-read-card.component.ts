import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFirebaseBook } from '../../interfaces/firebase-book.interface';

@Component({
  selector: 'app-books-read-card',
  templateUrl: './books-read-card.component.html',
  styleUrls: ['./books-read-card.component.scss'],
})
export class BooksReadCardComponent implements OnInit {
  @Input() book: IFirebaseBook;
  @Output() deleteBook = new EventEmitter();

  imgUrl: string;
  constructor() {}

  ngOnInit(): void {
    this.imgUrl = this.book?.thumbnail;
    console.log(this.book);
  }

  deleteFromReadBooks(){
    this.deleteBook.emit(this.book);
  }

}
