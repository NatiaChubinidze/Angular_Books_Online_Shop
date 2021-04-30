import { Component, OnInit, Input } from '@angular/core';
import { IBooks } from 'src/app/books-search/shared/interfaces/books-response.interface';
import { ICardBook } from '../../interfaces/book.interface';

@Component({
  selector: 'app-book-default-card',
  templateUrl: './book-default-card.component.html',
  styleUrls: ['./book-default-card.component.scss']
})
export class BookDefaultCardComponent implements OnInit {
@Input() book:IBooks;
imgUrl:string;
  constructor() { }

  ngOnInit(): void {
    this.imgUrl=this.book?.volumeInfo.imageLinks?.thumbnail;
  }

}


