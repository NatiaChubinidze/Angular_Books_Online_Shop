import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard/auth.guard';
import { BooksReadComponent } from './books-read.component';

const routes: Routes = [{ path: 'books-read', component: BooksReadComponent,canActivate:[AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksReadRoutingModule {}
