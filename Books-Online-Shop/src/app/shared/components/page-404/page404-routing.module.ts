import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard/auth.guard';
import { Page404Component } from './page404.component';

const routes: Routes = [
  {
    path: '**',
    component: Page404Component,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Page404RoutingModule { }
