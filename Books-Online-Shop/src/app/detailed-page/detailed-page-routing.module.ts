import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard/auth.guard';
import { DetailedPageComponent } from './detailed-page.component';

const routes: Routes = [
  {
  path:'details',
  component:DetailedPageComponent,
  canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailedPageRoutingModule { }
