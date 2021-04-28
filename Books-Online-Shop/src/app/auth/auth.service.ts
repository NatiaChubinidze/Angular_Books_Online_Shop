import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { IUserAuthInfo } from './shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  currentUser$ = new Observable<firebase.User | null>();
  isAdmin: boolean = false;
  errorMessage: string | null;
  infoMessage:string;
  constructor(private _router: Router, private auth: AngularFireAuth) {
    this.currentUser$ = this.auth.authState;
  }

  facebookSignIn() {
    this.errorMessage = null;
    this.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((data: any) => {
        if (data.credential.accessToken) {
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
          if (data.user.email === 'admin@email.com') {
            this.isAdmin = true;
          }
          this._router.navigate(['/home']);
        }
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
  register(userData: IUserAuthInfo) {
    console.log("registering");
    this.errorMessage = null;
    this.auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((data) => {
        if (data.user) {
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
    this.infoMessage='';
    //მითითებულ მეილზე გავუგზავნოთ პაროლის შეცვლის მეილი
    firebase
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.infoMessage=`reset email has been sent to ${emailAddress}`;
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
  }
}
