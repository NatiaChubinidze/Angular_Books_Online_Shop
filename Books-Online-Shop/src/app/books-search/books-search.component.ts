import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss']
})
export class BooksSearchComponent implements OnInit {
  categories:string[]=['fantasy',"science-fiction","detective","advanture",'documentary'];
books:string[]=["1","2","3","4","5","6","7","8","9"];
  constructor() { }

  ngOnInit(): void {
  }

}
