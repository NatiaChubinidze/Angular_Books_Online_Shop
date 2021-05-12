import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard/auth.guard';
import { WishlistComponent } from './wishlist.component';

const routes: Routes = [
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistRoutingModule {}
