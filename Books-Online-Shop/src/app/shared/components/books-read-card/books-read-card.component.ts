import { Component, Input, OnInit } from '@angular/core';
import { IBooks } from 'src/app/books-search/shared/interfaces/books-response.interface';

@Component({
  selector: 'app-books-read-card',
  templateUrl: './books-read-card.component.html',
  styleUrls: ['./books-read-card.component.scss']
})
export class BooksReadCardComponent implements OnInit {
  @Input() book:IBooks;
  imgUrl:string;
  constructor() { }

  ngOnInit(): void {
    this.imgUrl=this.book?.volumeInfo.imageLinks?.thumbnail;
  }

}
