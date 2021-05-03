import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';

import { AdminPanelComponent } from './admin-panel.component';
import { WishlistsComponent } from './wishlists/wishlists.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WishlistBooksComponent } from './wishlist-books/wishlist-books.component';



@NgModule({
  declarations: [AdminPanelComponent,WishlistsComponent,UsersComponent,DashboardComponent, WishlistBooksComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    RouterModule
  ]
})
export class AdminPanelModule { }
