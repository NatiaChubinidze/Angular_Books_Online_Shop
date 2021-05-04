import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IFirebaseBook } from 'src/app/shared/interfaces/firebase-book.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { ITopBooks } from '../shared/interfaces/top-books.interface';
import { ITopUsers } from '../shared/interfaces/top-users.interface';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  wishlistTopUsers: IUser[];
  shoppingCartTopUsers: IUser[];
  booksReadTopUsers: IUser[];

  wishlistTopBooks: ITopBooks[] = [];
  shoppingCartTopBooks: ITopBooks[] = [];
  booksReadTopBooks: ITopBooks[] = [];

  chartOptions = {};
  chartOptionsShopping={};
  chartOptionsRead={};

  Highcharts = Highcharts;

  constructor(private _adminService: AdminService) {}

  ngOnInit(): void {
    this._adminService.getWishlists();
    this._adminService.getUsers();
    this._adminService.getShoppingLists();
    this._adminService.getBooksRead();
   
    let wishlistDistincValues: IFirebaseBook[] = [];
    let shoppinglistDistincValues: IFirebaseBook[] = [];
    let booksReadDistincValues: IFirebaseBook[] = [];

    setTimeout(() => {
      this.getDistinctValues(this._adminService.wishlist, wishlistDistincValues);
    this.getDistinctValues(
      this._adminService.shoppingList,
      shoppinglistDistincValues
    );
    this.getDistinctValues(
      this._adminService.readBooksList,
      booksReadDistincValues
    );

    this.wishlistTopBooks=this.getBooksCount(
      this._adminService.wishlist,
      wishlistDistincValues
    );
    this.shoppingCartTopBooks=this.getBooksCount(
      this._adminService.shoppingList,
      shoppinglistDistincValues
    );
    this.booksReadTopBooks=this.getBooksCount(
      this._adminService.readBooksList,
      booksReadDistincValues
    );

    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Popular Books According to Wishlists',
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
          data: [...this.wishlistTopBooks],
        },
      ],
    };
    this.chartOptionsShopping = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Popular Books According to Shopping-lists',
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
          data: [...this.shoppingCartTopBooks],
        },
      ],
    };

    this.chartOptionsRead = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'Popular Books According to Books Read',
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
          data: [...this.booksReadTopBooks],
        },
      ],
    };

    this.wishlistTopUsers= this.getTopUsers(this._adminService.wishlist);
    this.shoppingCartTopUsers=this.getTopUsers(this._adminService.shoppingList);
    this.booksReadTopUsers=this.getTopUsers(this._adminService.readBooksList);
    }, 2000);
    
  
   
  }

  getDistinctValues(
    array: Array<IFirebaseBook>,
    distinctArray: Array<IFirebaseBook>
  ) {
    if (array) {
      array.forEach((item) => {
        if (array.indexOf(item) === 0) {
          distinctArray.push(item);
        } else {
          let isInArray: boolean = false;
          distinctArray.forEach((book) => {
            if (book.title === item.title) {
              isInArray = true;
            }
          });
          if (!isInArray) {
            distinctArray.push(item);
          }
        }
      });
    }
  }
  getBooksCount(
    array: Array<IFirebaseBook>,
    distinctArray: Array<IFirebaseBook>
  ) {
    let counter = 0;
    let numberedArray: ITopBooks[] = [];
    let arrayToAssign:ITopBooks[]=[];
    distinctArray.forEach((item) => {
      array.forEach((book) => {
        if (item.title === book.title) {
          counter++;
        }
      });
      let chartBook: ITopBooks = {
        name: item.title,
        y: counter / array.length,
      };
      numberedArray.push(chartBook);
    });
    numberedArray.sort((a, b) => b.y - a.y);
    console.log(numberedArray);
    if (numberedArray.length > 10) {
      console.log('arrays is longer than 10');
      arrayToAssign = numberedArray.slice(0, 10);
    } else {
      console.log('arrays is not longer than 10');
      arrayToAssign = numberedArray.slice();
    }
    console.log('saboloo masivi', arrayToAssign);
    return arrayToAssign;
  }

  getTopUsers(searchArray:Array<IFirebaseBook>){
    let counter=0;
    let topUsersArray:ITopUsers[]=[];
    this._adminService.usersList.forEach(user=>{
      searchArray.forEach(item=>{
        if(user.userUID===item.userUID){
          counter++;
        }
      });
      let topUser:ITopUsers={
        userUID:user.userUID,
        name:user.name,
        surname:user.surname,
        email:user.email,
        count:counter,
      };
      topUsersArray.push(topUser);
    });
    topUsersArray.sort((a,b)=>b.count-a.count);
    let topUsers:ITopUsers[]=[];
    if(topUsersArray.length>5){
      topUsers=topUsersArray.slice(0,5);
    } else{
      topUsers=topUsersArray.slice();
    }
    return topUsers;
  }

}
