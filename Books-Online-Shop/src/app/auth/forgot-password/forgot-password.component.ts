import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { FirebaseAuthService } from '../../shared/services/firebase-auth/firebase-auth.service';
import {showNav,hideNav} from '../../shared/components/navigation/state/nav-visibility/nav-visibility.actions';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  nav$: Observable<boolean>;
  email: FormControl;
  forgotPasswordForm: FormGroup;
  buttonHover: boolean;
  constructor(public firebaseAuthService: FirebaseAuthService, private store:Store<{nav:boolean}>) {
    this.nav$=store.select('nav');
    this.firebaseAuthService.errorMessage=null;
    this.firebaseAuthService.infoMessage=null;
    this.email = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.email
      ])
    );
    this.forgotPasswordForm = new FormGroup({
      email: this.email,
    });
  }

  sendResetEmail() {
    this.firebaseAuthService.forgotPassword(this.email.value);
  }
  emailIsInvalid(): boolean {
    return this.email.invalid && (this.email.touched || this.buttonHover);
  }

  hideNav() {
    this.store.dispatch(hideNav());
  }
  showNav() {
    this.store.dispatch(showNav());
  }
  ngOnInit(): void {
    this.hideNav();
  }
  ngOnDestroy():void{
    this.showNav();
  }
}
