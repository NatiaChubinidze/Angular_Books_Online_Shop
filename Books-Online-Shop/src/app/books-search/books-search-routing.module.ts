import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksSearchComponent } from './books-search.component';

const routes: Routes = [
  {path:'book-search',
component:BooksSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksSearchRoutingModule { }
