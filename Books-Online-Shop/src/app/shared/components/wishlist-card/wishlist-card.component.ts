import { Component, Input, OnInit } from '@angular/core';
import { IBooks } from 'src/app/books-search/shared/interfaces/books-response.interface';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss']
})
export class WishlistCardComponent implements OnInit {
  @Input() book:IBooks;
  imgUrl:string;
  constructor() { }

  ngOnInit(): void {
    this.imgUrl=this.book?.volumeInfo.imageLinks?.thumbnail;
  }

}
