import { Component, Input, OnInit } from '@angular/core';

import { IFirebaseBook } from 'src/app/shared/interfaces/firebase-book.interface';

@Component({
  selector: 'app-admin-wishlist-card',
  templateUrl: './admin-wishlist-card.component.html',
  styleUrls: ['./admin-wishlist-card.component.scss'],
})
export class AdminWishlistCardComponent implements OnInit {
  @Input() book: IFirebaseBook;
  imgUrl: string;
  constructor() {}

  ngOnInit(): void {
    this.imgUrl = this.book?.thumbnail;
  }
}
