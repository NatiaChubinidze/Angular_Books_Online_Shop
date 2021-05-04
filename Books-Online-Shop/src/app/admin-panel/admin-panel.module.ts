import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';

import { AdminPanelComponent } from './admin-panel.component';
import { WishlistsComponent } from './wishlists/admin-wishlist/wishlists.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WishlistBooksComponent } from './wishlists/wishlist-books/wishlist-books.component';
import { AdminWishlistCardComponent } from './wishlists/admin-wishlist-card/admin-wishlist-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminPanelComponent,
    WishlistsComponent,
    UsersComponent,
    DashboardComponent,
    WishlistBooksComponent,
    AdminWishlistCardComponent,
  ],
  imports: [CommonModule, HighchartsChartModule, RouterModule,FormsModule],
})
export class AdminPanelModule {}
