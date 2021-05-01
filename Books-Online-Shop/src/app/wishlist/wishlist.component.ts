import { Component, OnInit } from '@angular/core';

import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  private _searchTitle: string;
  private _searchAuthor: string;
  books: IFirebaseBook[]=[];
  filteredBooks: IFirebaseBook[]=[];

  constructor(private _firebaseCrudService: FireBaseCrudService) {}


  get searchTitle(): string {
    return this._searchTitle;

  }
  get searchAuthor(): string {
    return this._searchAuthor;
  }
  set searchTitle(value: string) {
    this._searchTitle = value;
    if (this._searchTitle) {
      this.filteredBooks = this.books.filter((book) =>{
        return (book.title.toLowerCase().includes(this._searchTitle.toLowerCase()))
      }
      );
      console.log(this.filteredBooks);
    } else {
      this.filteredBooks = this.books.slice();
    }
  }
  set searchAuthor(value: string) {
    this._searchAuthor = value;
    if (this._searchAuthor) {
      this.filteredBooks = this.books.filter((book) =>
        book.author.toLowerCase().includes(this._searchAuthor.toLowerCase())
      );
      console.log(this.filteredBooks);
    } else {
      this.filteredBooks = this.books.slice();
    }
  }

  addToRead(book: IFirebaseBook) {
    const bookToAdd: IFirebaseBook = {
      title: book.title,
      author: book.author,
      price: book.price,
      thumbnail: book.thumbnail,
      subject: book.subject,
      quantity: book.quantity,
    };
    this._firebaseCrudService.saveItem('books-read', bookToAdd);
    this._firebaseCrudService.deleteItem('wishlist', book.id);
    this.filteredBooks=this.filteredBooks.filter(item=>item.id!==book.id);
  }
  addToCart(book: IFirebaseBook) {
    const bookToAdd: IFirebaseBook = {
      title: book.title,
      author: book.author,
      price: book.price,
      thumbnail: book.thumbnail,
      subject: book.subject,
      quantity: book.quantity,
    };
    this._firebaseCrudService.saveItem('shopping-cart', bookToAdd);
  }
  
  deleteFromWishlist(book: IFirebaseBook) {
    this._firebaseCrudService.deleteItem('wishlist', book.id);
    this.filteredBooks=this.filteredBooks.filter(item=>item.id!==book.id);

  }

  ngOnInit(): void {
    this._firebaseCrudService
      .getCollection('wishlist')
      .subscribe((books: any) => {
        if (books) {
          this.books = this._firebaseCrudService.wishlist= books;
          console.log(this.books);
        }
      });
      setTimeout(()=>{
        if(this.books){
          this.searchTitle = '';
          this.searchAuthor = '';
        }
      },1000);
  }
}
