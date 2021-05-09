import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { IUserAuthInfo } from '../../../auth/shared/interfaces/auth.interface';
import { TOKEN_KEY } from '../../constants/constants';
import { AuthService } from '../auth/auth.service';
import { FireBaseCrudService } from '../firebase-crud/firebase-crud.service';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  currentUser$ = new Observable<firebase.User | null>();
  isAdmin: boolean = false;
  isSignedInWithEmail:boolean=false;
  userUID:string;
  errorMessage: string | null;
  infoMessage: string | null;
  constructor(
    private _router: Router,
    private auth: AngularFireAuth,
    private _authService: AuthService,
    private _firebaseCrudService:FireBaseCrudService
  ) {
    this.currentUser$ = this.auth.authState;
  }
  rememberMe: boolean;

  facebookSignIn() {
    this.errorMessage = null;
    this.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this.saveUserToFirebase();
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }

  googleSignIn() {
    this.errorMessage = null;
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this.saveUserToFirebase();
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  githubSignIn() {
    this.errorMessage = null;
    this.auth
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
          this.saveUserToFirebase();
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  emailSignIn(userData: IUserAuthInfo) {
    this.errorMessage = null;
    this.auth
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((data: any) => {
        if (data.user) { 
          this.saveUserToFirebase();
          this.isSignedInWithEmail=true;
          if (data.user.email === 'admin@gmail.com') {
            this.isAdmin = true;
          } else{
            this.isAdmin=false;
          }
          if (this.rememberMe === true) {
            localStorage.setItem(TOKEN_KEY, data.user.refreshToken);
            this._authService.setTokenValidTime();
          }
          if(this.isAdmin){
            this._router.navigate(['/admin']);
          } else{
          this._router.navigate(['/home']);
          }
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  register(userData: IUserAuthInfo) {
    console.log('registering');
    this.errorMessage = null;
    this.auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((data) => {
        if (data.user) {
          const newUser:IUser={
            name:'',
            surname:'',
            email:userData.email,
            userUID:data.user.uid
          };
          this._firebaseCrudService.saveItem('users',newUser);
          this.isSignedInWithEmail=true;
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  signOut() {
    this.auth.signOut();
    this._router.navigate(['/sign-in']);
  }
  userIsActive() {
    return this.currentUser$.pipe(
      map((userInfo: any) => {
        if (userInfo && userInfo.uid) {
          return true;
        } else {
          this._router.navigate(['/sign-in']);
          return false;
        }
      })
    );
  }
  forgotPassword(emailAddress: string): void {
    this.errorMessage = null;
    this.infoMessage = '';
    firebase
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.infoMessage = `reset email has been sent to ${emailAddress}`;
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  resetPassword(oldPassword: string, newPassword: string): void {
    this.errorMessage = '';
    this.infoMessage='';
    let user = firebase.auth().currentUser;
   
    this.auth.signInWithEmailAndPassword(user.email, oldPassword)
      .then((userInfo) => {
        if (userInfo.user) {
          user
            .updatePassword(newPassword)
            .then(() => {
              this.infoMessage='Password has been successfully updated!';
            })
            .catch((error) => {
              this.errorMessage = error.message;
            });
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  saveUserToFirebase() {
    console.log("save user to firebase");
    let isNewUser: boolean = true;
    this._firebaseCrudService
      .getCollection('users')
      .subscribe((users: IUser[]) => {
        if (users) {
          if (users.length > 0 && firebase.auth().currentUser) {
            users.forEach((user) => {
              if (user.userUID === firebase.auth().currentUser.uid) {
                console.log(firebase.auth().currentUser);
                isNewUser = false;
              }
            });
            console.log("is new user?", isNewUser);
            if (isNewUser) {
              console.log(firebase.auth().currentUser);
              let name: string ='';
              let surname: string='';
              let email:string='';
              if (firebase.auth().currentUser.displayName) {
                if (
                  firebase.auth().currentUser.displayName.split(' ').length ===
                  2
                ) {
                  name = firebase.auth().currentUser.displayName.split(' ')[0];
                  surname = firebase
                    .auth()
                    .currentUser.displayName.split(' ')[1];
                } 
              } 
              if(firebase.auth().currentUser.email){
                email=firebase.auth().currentUser.email;
              }
              
              const newUser: IUser = {
                name: name,
                surname: surname,
                email: email,
                userUID: firebase.auth().currentUser.uid,
              };
              console.log('new user', newUser);
              console.log('saving');
              this._firebaseCrudService.saveItem('users', newUser);
            }
          }
        }
      });
  }
}
