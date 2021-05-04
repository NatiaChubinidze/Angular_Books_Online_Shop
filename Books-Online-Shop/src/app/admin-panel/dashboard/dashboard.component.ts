import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: IUser[];
  wishlistTopUsers:IUser[];
  shoppingCartTopUsers:IUser[];
  booksReadTopUsers:IUser[];
  chartOptions = {};
  Highcharts = Highcharts;
  
  constructor(public adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getWishlists();
    this.adminService.getUsers();
    this.adminService.getShoppingLists();
    this.adminService.getBooksRead();
    this.users=this.adminService.usersList.slice();
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Popular Books According to Wishlists (2021)',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: [
            {
              name: 'Chrome',
              y: 61.41,
              sliced: true,
              selected: true,
            },
            {
              name: 'Internet Explorer',
              y: 11.84,
            },
            {
              name: 'Firefox',
              y: 10.85,
            },
            {
              name: 'Edge',
              y: 4.67,
            },
            {
              name: 'Safari',
              y: 4.18,
            },
            {
              name: 'Sogou Explorer',
              y: 1.64,
            },
            {
              name: 'Opera',
              y: 1.6,
            },
            {
              name: 'QQ',
              y: 1.2,
            },
            {
              name: 'Other',
              y: 2.61,
            },
          ],
        },
      ],
    };
  }
  

 

}
