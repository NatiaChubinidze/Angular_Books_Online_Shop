import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { MustMatch } from '../shared/validators/passwords-match.validator';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  oldPassword:FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  resetForm: FormGroup;
  buttonHover: boolean = false;

  constructor( public firebaseAuthService:FirebaseAuthService, private formBuilder: FormBuilder, private _firebaseCrudService:FireBaseCrudService) {
    this.oldPassword=new FormControl('',Validators.required);
    this.password = new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}',
        ),
      ]),
    );
    this.confirmPassword = new FormControl('', Validators.required);
    this.resetForm = this.formBuilder.group(
      { oldPassword:this.oldPassword,
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      { validators: MustMatch('password', 'confirmPassword') },
    );
  
   }

  ngOnInit(): void {
  }
  oldPasswordIsInvalid():boolean{
    return this.oldPassword.invalid && (this.oldPassword.touched);
  }
  
  passwordIsInvalid(): boolean {
    return this.password.invalid && (this.password.touched);
  }

  confirmPasswordIsInvalid(): boolean {
    return (
      this.confirmPassword.invalid &&
      ((this.confirmPassword.touched &&
        this.password.value &&
        this.confirmPassword.value !== this.password.value))
    );
  }

  resetPassword(): void {
    this.firebaseAuthService.resetPassword(this.oldPassword.value,this.password.value);
      this.resetForm.reset();
      setTimeout(() => {
        this.firebaseAuthService.errorMessage="";
        this.firebaseAuthService.infoMessage="";
      }, 5000);
  }

}
