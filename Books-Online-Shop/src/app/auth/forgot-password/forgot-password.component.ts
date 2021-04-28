import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: FormControl;
  forgotPasswordForm: FormGroup;
  buttonHover: boolean;
  constructor(public firebaseAuthService: FirebaseAuthService) {
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

  ngOnInit(): void {}
}
