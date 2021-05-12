import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard/auth.guard';
import { BooksSearchComponent } from './books-search.component';
import { BooksResolverService } from './shared/services/books-resolver.service';

const routes: Routes = [
  {
    path: 'book-search',
    component: BooksSearchComponent,
    resolve: {
      booksResponse: BooksResolverService,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksSearchRoutingModule {}
