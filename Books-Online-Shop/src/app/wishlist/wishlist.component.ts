import { Component, OnInit } from '@angular/core';

import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
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
  shoppingCart:IFirebaseBook[];

  constructor(private _firebaseCrudService: FireBaseCrudService,private _firebaseAuthService:FirebaseAuthService) {}


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
      userUID:this._firebaseAuthService.userUID
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
      userUID:this._firebaseAuthService.userUID
    };
    this._firebaseCrudService.saveItem('shopping-cart', bookToAdd);
  }
  
  deleteFromWishlist(book: IFirebaseBook) {
    this._firebaseCrudService.deleteItem('wishlist', book.id);
    this.filteredBooks=this.filteredBooks.filter(item=>item.id!==book.id);

  }

  
  isInShoppingCart(book:IFirebaseBook){
    let isInShoppingCart:boolean=false;
    this.shoppingCart.forEach(item=>{
      if(item.title.toLowerCase().includes(book.title.toLocaleLowerCase())){
        isInShoppingCart=true;
      }
    })
    return isInShoppingCart;
  }
  ngOnInit(): void {
    this._firebaseAuthService.currentUser$.subscribe(data=>{
      this._firebaseAuthService.userUID=data.uid;
    })
    this._firebaseCrudService
      .getCollection('wishlist')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.books = this._firebaseCrudService.wishlist= books.filter(item=>item.userUID===this._firebaseAuthService.userUID);
          console.log(this.books);
        }
      });
      setTimeout(()=>{
        if(this.books){
          this.searchTitle = '';
          this.searchAuthor = '';
        }
      },1000);

      this._firebaseCrudService
      .getCollection('shopping-cart')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.shoppingCart = books.filter(item=>item.userUID===this._firebaseAuthService.userUID);
        }
      });
  }
}
