import { Component, OnInit } from '@angular/core';
import { BooksSearchService } from '../shared/services/books-search/books-search.service';

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss']
})
export class DetailedPageComponent implements OnInit {

  constructor(public bookService:BooksSearchService) { }

  ngOnInit(): void {
  }

}
