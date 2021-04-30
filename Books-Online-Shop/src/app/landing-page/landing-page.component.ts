import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
categories:string[]=['fantasy',"science-fiction",'romance',"detective","advanture",'documentary',"fiction", "mystery"];
  constructor() { }

  ngOnInit(): void {
  }

}
