import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
  }

}
