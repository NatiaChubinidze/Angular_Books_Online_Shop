import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IBooks, IBooksResponse } from '../../../books-search/shared/interfaces/books-response.interface';
import { IBookSearchParams } from '../../../books-search/shared/interfaces/book-search.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksSearchService {
  activeBook:IBooks|null;
  searchParam:IBookSearchParams;
  activeCategory:string="";
  private _BASE_URL: string = 'https://www.googleapis.com/books/v1';
  constructor(private http: HttpClient) {}

  getFilteredBooks(){
    let queryString:string="";
    let searchParamsQuery={
      intitle:this.searchParam.intitle,
      inauthor:this.searchParam.inauthor,
      inpublisher:this.searchParam.inpublisher,
      isbn:this.searchParam.isbn,
      subject:this.searchParam.subject
    }
    let searchParamsFilter={
      orderBy:this.searchParam.orderBy,
      filter:this.searchParam.filter,
      langRestrics:this.searchParam.langRestrict
    }
    for(const key in searchParamsQuery){
      if (searchParamsQuery[key]!==undefined && searchParamsQuery[key]!==null && searchParamsQuery[key]!==""){
        if(queryString!==""){
       queryString+=`+${key}:${searchParamsQuery[key]}`
        }
        else{
          queryString+=`${key}:${searchParamsQuery[key]}`
        }
      }
    }
    for(const key in searchParamsFilter){
      if (searchParamsFilter[key]!==undefined  && searchParamsFilter[key]!==null && searchParamsFilter[key]!==""){
        queryString+=`&${key}=${searchParamsFilter[key]}`
      }
    }
    return this.http
    .get<IBooks[]>(
      `${this._BASE_URL}/volumes?q=${queryString}&maxResults=40&country=US`
    )
    .pipe(tap((data) => {}, catchError(this.handleError)));
    }
    getBooksByCategories(){
      return this.http
    .get<IBooksResponse>(
      `${this._BASE_URL}/volumes?q=subject:${this.activeCategory}&maxResults=40&country=US`
    )
    .pipe(tap((data) => {}, catchError(this.handleError)));
    }
    getPopularBooks(category:string){
      return this.http
    .get<IBooks[]>(
      `${this._BASE_URL}/volumes?q=subject:${category}&sortBy=relevance&maxResults=4`
    )
    .pipe(tap((data) => {}, catchError(this.handleError)));
    }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error has occurred during the processing: ${error.error.message}`;
    } else {
      errorMessage = `Server returned the following error: ${error.status}. Error message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
