import { Component, OnInit } from '@angular/core';
import { IFirebaseBook } from 'src/app/shared/interfaces/firebase-book.interface';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-books-sold',
  templateUrl: './books-sold.component.html',
  styleUrls: ['./books-sold.component.scss']
})
export class BooksSoldComponent implements OnInit {
  p: number = 1;
  private _searchTitle: string;
  private _searchAuthor: string;
  books: IFirebaseBook[] = [];
  filteredBooks: IFirebaseBook[] = [];


  constructor(
   private _adminService:AdminService
  ) {
    
  }

  get searchTitle(): string {
    return this._searchTitle;
  }
  get searchAuthor(): string {
    return this._searchAuthor;
  }
  set searchTitle(value: string) {
    this._searchTitle = value;
    if (this._searchTitle) {
      this.filteredBooks = this.books.filter((book) => {
        return book.title
          .toLowerCase()
          .includes(this._searchTitle.toLowerCase());
      });
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


  
  ngOnInit(): void {
    let dublicatesRemovedArray:IFirebaseBook[]=[];
    if(this._adminService.shoppingList){
    this._adminService.wishlist.forEach(item=>{
      if(this._adminService.wishlist.indexOf(item)===0){
        dublicatesRemovedArray.push(item);
      } else {
        let isInArray:boolean=false;
        dublicatesRemovedArray.forEach(book=>{
          if(book.title===item.title){
            isInArray=true;
          }
        })
        if(!isInArray){
          dublicatesRemovedArray.push(item);
        }
      }
    });
  }
    this.books=this.filteredBooks=dublicatesRemovedArray.slice();

    setTimeout(() => {
      if (this.books) {
        this.searchTitle = '';
        this.searchAuthor = '';
      }
    }, 1000);

    
  }

}
