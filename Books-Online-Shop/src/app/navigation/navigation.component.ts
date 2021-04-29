import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { EXP_TIME, TOKEN_EXP_KEY, TOKEN_KEY } from '../shared/constants';
import { AuthService } from '../shared/services/auth/auth.service';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _firebaseAuth: FirebaseAuthService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem(TOKEN_KEY)) {
      setInterval(() => {
        console.log('checking');
        if (!this._auth.tokenIsValid()) {
          this._firebaseAuth.userIsActive().subscribe((data) => {
            if (data === true) {
              firebase
                .auth()
                .currentUser.getIdToken(true)
                .then((token) => {
                  localStorage.setItem(TOKEN_KEY, token);
                  if (TOKEN_EXP_KEY) {
                    localStorage.removeItem(TOKEN_EXP_KEY);
                    console.log('removing old key');
                  }
                  this._auth.setTokenValidTime();
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        }
      }, EXP_TIME);
    }
  }

  signOut(){
    this._firebaseAuth.signOut();
    if(localStorage.getItem(TOKEN_KEY)){
      localStorage.removeItem(TOKEN_KEY);
    }
    if(localStorage.getItem(TOKEN_EXP_KEY)){
      localStorage.removeItem(TOKEN_EXP_KEY);
    }
  }
}
