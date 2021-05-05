import { Component, OnInit } from '@angular/core';
import { IFirebaseBook } from '../shared/interfaces/firebase-book.interface';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss']
})
export class BooksReadComponent implements OnInit {
  p: number = 1;
  private _searchTitle: string;
  private _searchAuthor: string;
  books:IFirebaseBook[];
  filteredBooks: IFirebaseBook[]=[];
  constructor(private _firebaseCrudService:FireBaseCrudService) { }

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

  addToCart(book:IFirebaseBook){
    this._firebaseCrudService.saveItem("shopping-cart",book);
  }
  deleteFromReadBooks(book:IFirebaseBook){
    console.log("deleting");
    console.log(book.id);
    this._firebaseCrudService.deleteItem("books-read",book.id);
    this.filteredBooks=this.filteredBooks.filter(item=>item.id!==book.id);

  }

  ngOnInit(): void {
    this._firebaseCrudService.getCollection("books-read").subscribe((books:any)=>{
      if(books){
        this.books=this._firebaseCrudService.wishlist=books;
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
