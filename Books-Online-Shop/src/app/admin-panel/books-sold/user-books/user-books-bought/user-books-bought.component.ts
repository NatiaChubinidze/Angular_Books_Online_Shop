import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin-panel/shared/services/admin.service';
import { IFirebaseBook } from 'src/app/shared/interfaces/firebase-book.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-books-bought',
  templateUrl: './user-books-bought.component.html',
  styleUrls: ['./user-books-bought.component.scss']
})
export class UserBooksBoughtComponent implements OnInit {
  p: number = 1;
  private _searchTitle: string;
  private _searchAuthor: string;
  books: IFirebaseBook[] = [];
  filteredBooks: IFirebaseBook[] = [];
  activeUser:IUser;

  constructor(
    private _adminService:AdminService
  ) {
    this.activeUser=this._adminService.activeUser;
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
    this.books=this.filteredBooks=this._adminService.shoppingList.filter(item=>item.userUID===this._adminService.activeUser.userUID);
    setTimeout(() => {
      if (this.books) {
        this.searchTitle = '';
        this.searchAuthor = '';
      }
    }, 1000);

    
  }

}
