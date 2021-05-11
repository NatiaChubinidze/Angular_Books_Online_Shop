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
    'Adventure',
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
      } else{
        this._router.navigate(['sign-in']);
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
    const categorySearch={
      subject:category,
    };
    // this._router.navigate([],{
    //   queryParamsHandling:'',
    //   replaceUrl:true,
    //   queryParams:categorySearch
    // })
    this._router.navigate(['/book-search'],{
      queryParamsHandling:'',
      replaceUrl:true,
      queryParams:categorySearch
    });
  }

  showBookDetails(book: IBooks) {
    this._bookService.activeBook = book;
    this._router.navigate(['/details']);
  }
  
  addToCart(book: IBooks) {
    let bookToAdd: IFirebaseBook;
    let category:string='';
    if(book.volumeInfo.categories){
      category=book.volumeInfo.categories[0];
    }
    if (book.saleInfo.retailPrice) {
      bookToAdd = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        priceAmount: book.saleInfo.retailPrice.amount,
        subject: category,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    } else {
      bookToAdd= {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        subject: category,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    }
    console.log(bookToAdd);
    this._firebaseCrudService.saveItem('shopping-cart', bookToAdd);
  }
  addToWishlist(book: IBooks) {
    let bookToAdd: IFirebaseBook;
    let category:string='';
    if(book.volumeInfo.categories){
      category=book.volumeInfo.categories[0];
    }
    if (book.saleInfo.retailPrice) {
      bookToAdd = {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        priceAmount: book.saleInfo.retailPrice.amount,
        subject: category,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    } else {
      bookToAdd= {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        price: book.saleInfo.saleability,
        subject: category,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        quantity: 1,
        userUID: this._firebaseAuthService.userUID,
      };
    }
    
    console.log(bookToAdd);
    this._firebaseCrudService.saveItem('wishlist', bookToAdd);
  }
  deleteFromWishlist(book: IBooks) {
    if (this.wishlist) {
      this.wishlist.forEach((item) => {
        if (
          item.title
            .toLowerCase()
            .includes(book.volumeInfo.title.toLocaleLowerCase())
        ) {
          this._firebaseCrudService.deleteItem('wishlist', item.id);
        }
      });
    }
  }

  deleteFromCart(book: IBooks) {
    if (this.shoppingCart) {
      this.shoppingCart.forEach((item) => {
        if (
          item.title
            .toLowerCase()
            .includes(book.volumeInfo.title.toLocaleLowerCase()) && !item.ordered
        ) {
          this._firebaseCrudService.deleteItem('shopping-cart', item.id);
        }
      });
    }
  }
}
