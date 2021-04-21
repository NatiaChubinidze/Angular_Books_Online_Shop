import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  books:string[]=["1","2","3","4","5","6","7","8","9"];

  constructor() { }

  ngOnInit(): void {
  }

}
