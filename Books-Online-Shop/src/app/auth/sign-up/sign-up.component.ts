import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { FirebaseAuthService } from '../auth.service';
import { MustMatch } from '../shared/validators/passwords-match.validator';
import { forbiddenNameValidator } from '../shared/validators/forbidden-email.validator';
import { IUserAuthInfo } from '../shared/interfaces/auth.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpData:IUserAuthInfo={
    email:'',
    password:'',
    confirmPassword:'',
  };

  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  signUpForm: FormGroup;
  buttonHover: boolean = false;

  constructor(public fireBaseAuthService: FirebaseAuthService,
    private formBuilder: FormBuilder) {
      this.email = new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          forbiddenNameValidator(/admin@test.com/i),
        ])
      );
      this.password = new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}'
          ),
        ])
      );
      this.confirmPassword = new FormControl(
        '',
        Validators.compose([Validators.required])
      );
      this.signUpForm = this.formBuilder.group(
        {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        },
        { validators: MustMatch('password', 'confirmPassword') }
      );
    }
    confirmPasswordIsInvalid(): boolean {
      return (
        this.confirmPassword.invalid &&
        ((this.confirmPassword.touched &&
          this.password.value &&
          this.confirmPassword.value !== this.password.value) ||
          this.buttonHover)
      );
    }
    emailIsInvalid(): boolean {
      return this.email.invalid && (this.email.touched || this.buttonHover);
    }
    passwordIsInvalid(): boolean {
      return this.password.invalid && (this.password.touched || this.buttonHover);
    }
    
  
    register() {
      console.log("click");
      this.signUpData = this.signUpForm.value as IUserAuthInfo;
      this.fireBaseAuthService.register(this.signUpData);
    }

  ngOnInit(): void {}
}
