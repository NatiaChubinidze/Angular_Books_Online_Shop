import { Component, OnInit } from '@angular/core';
import { IFirebaseBook } from 'src/app/shared/interfaces/firebase-book.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { FirebaseAuthService } from 'src/app/shared/services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from 'src/app/shared/services/firebase-crud/firebase-crud.service';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss']
})
export class WishlistsComponent implements OnInit {
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
    this.books=this.filteredBooks=this._adminService.wishlist.filter(item=>item.userUID===this._adminService.activeUser.userUID);
    setTimeout(() => {
      if (this.books) {
        this.searchTitle = '';
        this.searchAuthor = '';
      }
    }, 1000);

    
  }

}
