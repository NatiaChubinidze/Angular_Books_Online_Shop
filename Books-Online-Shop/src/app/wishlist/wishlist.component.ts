import { Component, OnInit } from '@angular/core';

import { IBooks } from '../books-search/shared/interfaces/books-response.interface';
import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  
  books:IFirebaseBook[];

  constructor(private _firebaseCrudService:FireBaseCrudService) { }

  ngOnInit(): void {
    this._firebaseCrudService.getCollection("wishlist").subscribe((books:any)=>{
      if(books){
        this.books=this._firebaseCrudService.wishlist=books;
        console.log(this.books);
      }
    })
  }

  addToRead(book:IFirebaseBook){
    const bookToAdd:IFirebaseBook={
      title:book.title,
      author:book.author,
      price:book.price,
      thumbnail:book.thumbnail,
      subject:book.subject,
      quantity:book.quantity,
    }
    this._firebaseCrudService.saveItem("books-read",bookToAdd);
    this._firebaseCrudService.deleteItem("wishlist",book.id);
  }
  addToCart(book:IFirebaseBook){
    const bookToAdd:IFirebaseBook={
      title:book.title,
      author:book.author,
      price:book.price,
      thumbnail:book.thumbnail,
      subject:book.subject,
      quantity:book.quantity,
    }
    this._firebaseCrudService.saveItem("shopping-cart",bookToAdd);
  }
  deleteFromWishlist(book:IFirebaseBook){
    this._firebaseCrudService.deleteItem("wishlist",book.id);
  }

}
