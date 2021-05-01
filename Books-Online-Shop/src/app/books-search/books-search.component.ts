import {
  Component,
  OnInit,
  ɵCodegenComponentFactoryResolver,
} from '@angular/core';
import { Router } from '@angular/router';
import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { BooksSearchService } from '../shared/services/books-search/books-search.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';
import { IBookSearchParams } from './shared/interfaces/book-search.interface';
import {
  IBooks,
  IBooksResponse,
} from './shared/interfaces/books-response.interface';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent implements OnInit {
  categories: string[] = [
    'Mystery',
    'Science-fiction',
    'Detective',
    'Advanture',
    'Documentary',
  ];
  books: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  wishlist:IFirebaseBook[];
  shoppingCart:IFirebaseBook[];

  searchParams: IBookSearchParams = {
    subject: 'Choose Category',
    langRestrict: 'Choose Language',
    filter: 'Filter by',
    orderBy: 'Order by',
  };
  booksArray: IBooks[];
  constructor(
    private _bookService: BooksSearchService,
    private _router: Router,
    private _firebaseCrudService:FireBaseCrudService
  ) {}

  ngOnInit(): void {
    if (this._bookService.activeCategory === '') {
      this._bookService.getBooks().subscribe((data: any) => {
        console.log(data);
        this.booksArray = data.items;
      });
    } else {
      this._bookService.getBooksByCategories().subscribe((data: any) => {
        this.booksArray = data.items;
      });
    }
    this._firebaseCrudService
    .getCollection('wishlist')
    .subscribe((books: any) => {
      if (books) {
        this.wishlist = books;
      }
    });
    this._firebaseCrudService
    .getCollection('shopping-cart')
    .subscribe((books: any) => {
      if (books) {
        this.shoppingCart = books;
      }
    });
  }
  isInWishlist(book:IBooks){
    let isInWishlist:boolean=false;
    this.wishlist.forEach(item=>{
      if(item.title.toLowerCase().includes(book.volumeInfo.title.toLocaleLowerCase())){
        isInWishlist=true;
      }
    })
    return isInWishlist;
  }
  isInShoppingCart(book:IBooks){
    let isInShoppingCart:boolean=false;
    this.shoppingCart.forEach(item=>{
      if(item.title.toLowerCase().includes(book.volumeInfo.title.toLocaleLowerCase())){
        isInShoppingCart=true;
      }
    })
    return isInShoppingCart;
  }
  showBookDetails(book: IBooks) {
    this._bookService.activeBook = book;
    this._router.navigate(['/details']);
  }
  getFilteredBooks() {
    this._bookService.searchParam = { ...this.searchParams };
    console.log(this.searchParams);
    this._bookService.getFilteredBooks().subscribe((books: any) => {
      this.booksArray = books.items;
      console.log(this.booksArray);
    });
  }
  getBooksByCategories(category: string) {
    this._bookService.activeCategory = category;
    this._bookService.getBooksByCategories().subscribe((books: any) => {
      this.booksArray = books.items;
    });
  }
  addToCart(book:IBooks){
    const bookToAdd:IFirebaseBook={
      title:book.volumeInfo.title,
      author:book.volumeInfo.authors[0],
      price:book.saleInfo.saleability,
      subject:book.volumeInfo.categories[0],
      thumbnail:book.volumeInfo.imageLinks.thumbnail,
      quantity:1,
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
    }
    this._firebaseCrudService.saveItem("wishlist",bookToAdd);
  }
}
