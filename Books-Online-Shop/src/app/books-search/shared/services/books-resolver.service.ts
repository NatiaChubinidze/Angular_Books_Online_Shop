import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { BooksSearchService } from 'src/app/shared/services/books-search/books-search.service';
import { IBooks, IBooksResponse } from '../interfaces/books-response.interface';
import { IBookSearchParams } from '../interfaces/book-search.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksResolverService implements Resolve<IBooksResponse>{

  constructor(private _booksSearchService:BooksSearchService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBooksResponse> {
    const intitle:any=route.queryParamMap.get("intitle") || null;
    const inauthor:any=route.queryParamMap.get("inauthor") || null;
    const inpublisher:any=route.queryParamMap.get("inpublisher") ||null;
    const isbn:any=route.queryParamMap.get("isbn") || null;
    const filter:any=route.queryParamMap.get("filter") || null;
    const orderBy:any=route.queryParamMap.get("orderBy") || null;
    console.log(route.queryParamMap.get("subject"));
    let subject:any;
    if(route.queryParamMap.get("subject")===null){
    subject='fiction';
    } else{
      subject=route.queryParamMap.get("subject").toLowerCase();
    }
    console.log(subject);
    const langRestrict:any=route.queryParamMap.get("langRestrict") || null;

    const params: IBookSearchParams = {
      intitle:intitle,
      inauthor:inauthor,
      inpublisher:inpublisher,
      isbn:isbn,
      filter:filter,
      orderBy:orderBy,
      subject:subject,
      langRestrict:langRestrict
    };
    this._booksSearchService.searchParam=params;
    console.log("resolver...");
    return this._booksSearchService.getFilteredBooks()
      .pipe(catchError((err) => of(err)));
  }
}
