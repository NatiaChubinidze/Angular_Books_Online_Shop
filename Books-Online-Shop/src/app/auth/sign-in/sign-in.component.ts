import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TOKEN_EXP_KEY, TOKEN_KEY } from 'src/app/shared/constants/constants';
import { FirebaseAuthService } from '../../shared/services/firebase-auth/firebase-auth.service';
import { IUserAuthInfo } from '../shared/interfaces/auth.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInInfo: IUserAuthInfo = {
    email: '',
    password: '',
    rememberMe: false,
  };
  email: FormControl;
  password: FormControl;
  rememberMe: FormControl;
  signInForm: FormGroup;
  buttonHover: boolean = false;

  constructor(
    public fireBaseAuthService: FirebaseAuthService,
    private _router: Router
  ) {
    this.fireBaseAuthService.errorMessage=null;
    this.fireBaseAuthService.infoMessage=null;
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
    this.rememberMe = new FormControl(false);
    this.signInForm = new FormGroup({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });
  }
  emailIsInvalid(): boolean {
    return this.email.invalid && (this.email.touched || this.buttonHover);
  }
  passwordIsInvalid(): boolean {
    return this.password.invalid && (this.password.touched || this.buttonHover);
  }
  facebookSignIn() {
    this.fireBaseAuthService.facebookSignIn();
 
  }
  githubSignIn() {
    this.fireBaseAuthService.githubSignIn();
   
  }
  googleSignIn() {
    this.fireBaseAuthService.googleSignIn();
    
  }
  emailSignIn() {
    this.signInInfo = this.signInForm.value as IUserAuthInfo;
    console.log(this.signInInfo);
    this.fireBaseAuthService.emailSignIn(this.signInInfo);
    this.fireBaseAuthService.rememberMe = this.signInInfo.rememberMe;
 
  }
  

  ngOnInit(): void {
    if (
      localStorage.getItem(TOKEN_KEY) &&
      localStorage.getItem(TOKEN_EXP_KEY)
    ) {
      this.fireBaseAuthService.currentUser$.subscribe(data=>{
        if(data){
          if(data.email==='admin@gmail.com'){
            this._router.navigate(['/admin']);
          } else {
            this._router.navigate(['/home']);
          }
        }
      })
    
    }
  }
}
