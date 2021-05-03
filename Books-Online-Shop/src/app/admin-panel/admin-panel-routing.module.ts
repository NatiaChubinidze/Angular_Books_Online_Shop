import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { WishlistBooksComponent } from './wishlist-books/wishlist-books.component';
import { WishlistsComponent } from './wishlists/wishlists.component';

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
    path: 'admin-panel/wishlists',
    component: WishlistsComponent,
  },
  {
    path: 'wishlist-books',
    component: WishlistBooksComponent,
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
