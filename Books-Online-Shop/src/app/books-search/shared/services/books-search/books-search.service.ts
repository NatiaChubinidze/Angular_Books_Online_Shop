import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IBooks } from '../../interfaces/books-response.interface';
import { IBookSearchParams } from '../../interfaces/book-search.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksSearchService {
  activeBook:IBooks|null;
  searchParam:IBookSearchParams;
  activeCategory:string;
  private _BASE_URL: string = 'https://www.googleapis.com/books/v1';
  constructor(private http: HttpClient) {}
  getBooks(): Observable<IBooks[]> {
    return this.http
      .get<IBooks[]>(
        `${this._BASE_URL}/volumes?q=subject:fiction&filter=free-ebooks&maxResults=10`
      )
      .pipe(tap((data) => {}, catchError(this.handleError)));
  }
  getFilteredBooks(){
    let queryString:string="";
    if(this.searchParam.subject==='Choose Category'){
      this.searchParam.subject=undefined;
    }
    if(this.searchParam.langRestrict==='Choose Language'){
      this.searchParam.langRestrict=undefined;
    }
    if(this.searchParam.filter==='Filter by'){
      this.searchParam.filter=undefined;
    }
    if(this.searchParam.orderBy==='Order by'){
      this.searchParam.orderBy=undefined;
    }
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
      if (searchParamsQuery[key]!==undefined && searchParamsQuery[key]!==""){
        if(queryString!==""){
       queryString+=`+${key}:${searchParamsQuery[key]}`
        }
        else{
          queryString+=`${key}:${searchParamsQuery[key]}`
        }
      }
    }
    for(const key in searchParamsFilter){
      if (searchParamsFilter[key]!==undefined && searchParamsFilter[key]!==""){
        queryString+=`&${key}=${searchParamsFilter[key]}`
      }
    }
    return this.http
    .get<IBooks[]>(
      `${this._BASE_URL}/volumes?q=${queryString}`
    )
    .pipe(tap((data) => {}, catchError(this.handleError)));
    }
    getBooksByCategories(){
      return this.http
    .get<IBooks[]>(
      `${this._BASE_URL}/volumes?q=subject:${this.activeCategory}`
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
