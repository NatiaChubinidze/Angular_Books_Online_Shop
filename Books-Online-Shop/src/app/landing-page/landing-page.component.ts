import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBooks } from '../books-search/shared/interfaces/books-response.interface';
import { BooksSearchService } from '../shared/services/books-search/books-search.service';

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
    'Advanture',
    'Documentary',
    'Fiction',
    'Mystery',
  ];
  popularBooks: IBooks[];
  constructor(
    private _bookService: BooksSearchService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._bookService.getPopularBooks('fiction').subscribe((data: any) => {
      this.popularBooks = data.items;
    });
  }

  getBooksByCategory(category: string) {
    this._bookService.activeCategory = category;
    this._router.navigate(['/book-search']);
  }
}
