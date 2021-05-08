import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
 @Input() topUsers: IUser[];
  constructor() { }

  ngOnInit(): void {
  }

}
