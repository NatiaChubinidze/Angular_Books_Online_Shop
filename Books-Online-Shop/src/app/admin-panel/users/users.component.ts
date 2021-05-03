import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: string[] = ['1', '2', '3', '4', '5'];
  constructor() { }

  ngOnInit(): void {
  }

}
