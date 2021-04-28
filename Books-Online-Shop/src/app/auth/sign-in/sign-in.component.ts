import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FirebaseAuthService } from '../auth.service';
import { IUserAuthInfo } from '../shared/interfaces/auth.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInInfo:IUserAuthInfo={
    email:'',
    password:'',
    rememberMe:false,
  };
  email: FormControl;
  password: FormControl;
  rememberMe:FormControl;
  signInForm: FormGroup;
  buttonHover: boolean = false;

  constructor(public fireBaseAuthService: FirebaseAuthService) {
    this.email = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
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
    this.rememberMe=new FormControl(false);
    this.signInForm=new FormGroup({
      email:this.email,
      password:this.password,
      rememberMe:this.rememberMe
    });
   }
   emailIsInvalid(): boolean {
    return this.email.invalid && (this.email.touched || this.buttonHover);
  }
  passwordIsInvalid(): boolean {
    return this.password.invalid && (this.password.touched || this.buttonHover);
  }
  facebookSignIn(){
    this.fireBaseAuthService.facebookSignIn();
  }
  githubSignIn(){
    this.fireBaseAuthService.githubSignIn();
  }
  googleSignIn(){
    this.fireBaseAuthService.googleSignIn();
  }
  emailSignIn(){
    console.log(this.signInForm.value);
    this.signInInfo=this.signInForm.value as IUserAuthInfo;
    console.log(this.signInInfo);
    this.fireBaseAuthService.emailSignIn(this.signInInfo);
  }
  ngOnInit(): void {
  }

}
