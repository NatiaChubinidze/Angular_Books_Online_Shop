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

const routes: Routes = [{
  path: '',
  component: AdminPanelComponent,
  children:[
    {
      path: '',
      redirectTo:'dashboard',
      pathMatch:'full'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'users',
      component: UsersComponent,
    },
    {
      path: 'users/options',
      component:OptionsComponent,
    },
  {
    path: 'users/options/wishlist',
    component: WishlistsComponent,
  },
  {
    path: 'users/options/books-read',
    component: UserBooksReadComponent,
  },
  {
    path: 'users/options/shopping-cart',
    component: UserBooksBoughtComponent,
  },
  {
    path: 'wishlist-books',
    component: WishlistBooksComponent,
  },
  {
    path: 'books-sold',
    component: BooksSoldComponent,
  },
  {
    path: 'books-read',
    component: AllBooksReadComponent,
  },
  
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule { }
