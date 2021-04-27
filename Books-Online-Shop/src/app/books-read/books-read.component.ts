import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books-read',
  templateUrl: './books-read.component.html',
  styleUrls: ['./books-read.component.scss']
})
export class BooksReadComponent implements OnInit {
  books:string[]=["1","2","3","4","5","6","7","8","9"];

  constructor() { }

  ngOnInit(): void {
  }

}
