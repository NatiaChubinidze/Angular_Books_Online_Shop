import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBooks } from '../books-search/shared/interfaces/books-response.interface';
import { BooksSearchService } from '../shared/services/books-search/books-search.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';
import {IFirebaseBook} from '../shared/interfaces/firebase-book.interface';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  categories: string[] = [
    'Fantasy',
    'Science-fiction',
    'Romance',
    'Detective',
    'Advanture',
    'Documentary',
    'Fiction',
    'Mystery',
  ];
  popularBooks: IBooks[];
  wishlist:IFirebaseBook[];
  shoppingCart:IFirebaseBook[];

  constructor(
    private _bookService: BooksSearchService,
    private _router: Router,
    private _firebaseCrudService:FireBaseCrudService,
    private _firebaseAuthService:FirebaseAuthService
  ) {}

  ngOnInit(): void {
    this._firebaseAuthService.currentUser$.subscribe(data=>{
      if(data){
      this._firebaseAuthService.userUID=data.uid;
      }
    })
    this._bookService.getPopularBooks('fantasy').subscribe((data: any) => {
      this.popularBooks = data.items;
    });
    this._firebaseCrudService
      .getCollection('wishlist')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.wishlist = books.filter(item=>item.userUID===this._firebaseAuthService.userUID);
        }
      });
      this._firebaseCrudService
      .getCollection('shopping-cart')
      .subscribe((books: IFirebaseBook[]) => {
        if (books) {
          this.shoppingCart = books.filter(item=>item.userUID===this._firebaseAuthService.userUID);
        }
      });
  }

  isInWishlist(book:IBooks){
    let isInWishlist:boolean=false;
    if(this.wishlist){
    this.wishlist.forEach(item=>{
      if(item.title.toLowerCase().includes(book.volumeInfo.title.toLocaleLowerCase())){
        isInWishlist=true;
      }
    })
  }
    return isInWishlist;
  }
  isInShoppingCart(book:IBooks){
    let isInShoppingCart:boolean=false;
    if(this.shoppingCart){
    this.shoppingCart.forEach(item=>{
      if(item.title.toLowerCase().includes(book.volumeInfo.title.toLocaleLowerCase())){
        isInShoppingCart=true;
      }
    })
  }
    return isInShoppingCart;
  }
  getBooksByCategory(category: string) {
    this._bookService.activeCategory = category;
    this._router.navigate(['/book-search']);
  }

  showBookDetails(book: IBooks) {
    this._bookService.activeBook = book;
    this._router.navigate(['/details']);
  }
  
  addToCart(book:IBooks){
    const bookToAdd:IFirebaseBook={
      title:book.volumeInfo.title,
      author:book.volumeInfo.authors[0],
      price:book.saleInfo.saleability,
      subject:book.volumeInfo.categories[0],
      thumbnail:book.volumeInfo.imageLinks.thumbnail,
      quantity:1,
      userUID:this._firebaseAuthService.userUID
    }
    this._firebaseCrudService.saveItem("shopping-cart",bookToAdd);
  }
  addToWishlist(book:IBooks){
    const bookToAdd:IFirebaseBook={
      title:book.volumeInfo.title,
      author:book.volumeInfo.authors[0],
      price:book.saleInfo.saleability,
      subject:book.volumeInfo.categories[0],
      thumbnail:book.volumeInfo.imageLinks.thumbnail,
      quantity:1,
      userUID:this._firebaseAuthService.userUID
    }
    this._firebaseCrudService.saveItem("wishlist",bookToAdd);
  }
}
