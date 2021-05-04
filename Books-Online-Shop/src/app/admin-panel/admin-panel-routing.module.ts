import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './outline/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { WishlistBooksComponent } from './wishlists/wishlist-books/wishlist-books.component';
import { WishlistsComponent } from './wishlists/user-wishlist/wishlists.component';
import { BooksSoldComponent } from './books-sold/books-sold/books-sold.component';
import { OptionsComponent } from './options/options.component';
import { UserBooksReadComponent } from './books-read/user-books/user-books-read/user-books-read.component';
import { UserBooksBoughtComponent } from './books-sold/user-books/user-books-bought/user-books-bought.component';
import { AllBooksReadComponent } from './books-read/books-read/books-read.component';

const routes: Routes = [
  {
    path: 'admin-panel/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin-panel/users',
    component: UsersComponent,
  },
  {
    path: 'admin-panel/users/options',
    component:OptionsComponent,
  },
  {
    path: 'admin-panel/users/wishlist',
    component: WishlistsComponent,
  },
  {
    path: 'admin-panel/users/books-read',
    component: UserBooksReadComponent,
  },
  {
    path: 'admin-panel/users/shopping-cart',
    component: UserBooksBoughtComponent,
  },
  {
    path: 'admin-panel/wishlist-books',
    component: WishlistBooksComponent,
  },
  {
    path: 'admin-panel/books-sold',
    component: BooksSoldComponent,
  },
  {
    path: 'admin-panel/books-read',
    component: AllBooksReadComponent,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule { }
