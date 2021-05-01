import { Component, OnInit } from '@angular/core';
import { IBooks } from '../books-search/shared/interfaces/books-response.interface';
import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss']
})
export class BooksReadComponent implements OnInit {
  books:IFirebaseBook[];

  constructor(private _firebaseCrudService:FireBaseCrudService) { }

  ngOnInit(): void {
    this._firebaseCrudService.getCollection("books-read").subscribe((books:any)=>{
      if(books){
        this.books=this._firebaseCrudService.wishlist=books;
        console.log(this.books);
      }
    })
  }
  addToCart(book:IFirebaseBook){
    this._firebaseCrudService.saveItem("shopping-cart",book);
  }
  deleteFromReadBooks(book:IFirebaseBook){
    console.log("deleting");
    console.log(book.id);
    this._firebaseCrudService.deleteItem("books-read",book.id);
  }

}
