import { Component, Input, OnInit } from '@angular/core';
import { IBooks } from 'src/app/books-search/shared/interfaces/books-response.interface';

@Component({
  selector: 'app-book-cards',
  templateUrl: './book-cards.component.html',
  styleUrls: ['./book-cards.component.scss']
})
export class BookCardsComponent implements OnInit {
  @Input() book:IBooks;
  imgUrl:string;
  constructor() { }

  ngOnInit(): void {
    this.imgUrl=this.book?.volumeInfo.imageLinks?.thumbnail;
  }
  

}
