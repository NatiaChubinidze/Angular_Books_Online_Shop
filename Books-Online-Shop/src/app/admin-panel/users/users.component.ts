import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[];
  constructor(private _adminService: AdminService, private _router: Router) {}

  ngOnInit(): void {
    this.users = this._adminService.usersList;
  }
  navigateToOptions(user: IUser) {
    this._adminService.activeUser = user;
    this._router.navigate(['/users/options']);
  }
}
