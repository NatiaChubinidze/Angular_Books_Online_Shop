import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { HighchartsChartModule } from 'highcharts-angular';

import { AdminPanelComponent } from './outline/admin-panel.component';
import { WishlistsComponent } from './wishlists/user-wishlist/wishlists.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WishlistBooksComponent } from './wishlists/wishlist-books/wishlist-books.component';
import { AdminWishlistCardComponent } from './shared/conponents/book-card/admin-wishlist-card.component';
import { OptionsComponent } from './options/options.component';
import { UserBooksReadComponent } from './books-read/user-books/user-books-read/user-books-read.component';
import { UserBooksBoughtComponent } from './books-sold/user-books/user-books-bought/user-books-bought.component';
import { AllBooksReadComponent } from './books-read/books-read/books-read.component';
import { BooksSoldComponent } from './books-sold/books-sold/books-sold.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';

@NgModule({
  declarations: [
    AdminPanelComponent,
    WishlistsComponent,
    AllBooksReadComponent,
    BooksSoldComponent,
    UsersComponent,
    DashboardComponent,
    WishlistBooksComponent,
    AdminWishlistCardComponent,
    OptionsComponent,
    UserBooksReadComponent,
    UserBooksBoughtComponent,
  ],
  imports: [CommonModule, HighchartsChartModule, RouterModule,FormsModule, NgxPaginationModule,AdminPanelRoutingModule],
})
export class AdminPanelModule {}
