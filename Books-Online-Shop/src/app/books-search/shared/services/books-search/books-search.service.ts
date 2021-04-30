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
  private _BASE_URL: string = 'https://www.googleapis.com/books/v1';
  constructor(private http: HttpClient) {}
  getArticles(): Observable<IBooks[]> {
    return this.http
      .get<IBooks[]>(
        `${this._BASE_URL}/volumes?q=subject:fiction&filter=free-ebooks&maxResults=10`
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
