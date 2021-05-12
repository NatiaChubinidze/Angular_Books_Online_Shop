import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageGuard } from '../shared/guards/auth-pages-guard/auth-page.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate:[AuthPageGuard]
  },
  
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate:[AuthPageGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate:[AuthPageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
