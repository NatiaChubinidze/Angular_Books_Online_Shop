import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';


import { IProfile } from '../../../profile/shared/interfaces/profile.interface';
import { EXP_TIME, TOKEN_EXP_KEY, TOKEN_KEY } from '../../constants/constants';
import { IFirebaseBook } from '../../interfaces/firebase-book.interface';
import { AuthService } from '../../services/auth/auth.service';
import { FirebaseAuthService } from '../../services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from '../../services/firebase-crud/firebase-crud.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  fadeNav$: Observable<number>;
  profilePictureURL: string = '';
  displayName: string = '';
  cartItems:number;
  constructor(
    private _auth: AuthService,
    private _firebaseAuth: FirebaseAuthService,
    private _firebaseCrudService: FireBaseCrudService,
    private store: Store<any>
  ) {
    this.fadeNav$ = this.store.select('fadeNav');
  }

  ngOnInit(): void {
    if (localStorage.getItem(TOKEN_KEY)) {
      setInterval(() => {
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

    this._firebaseAuth.currentUser$.subscribe((data: any) => {
      if (data) {
        this._firebaseAuth.userUID = data.uid;
      }
    });
    this._firebaseCrudService
      .getCollection('profile')
      .subscribe((data: IProfile[]) => {
        const myProfile = data.filter(
          (profile) => profile.userUID === this._firebaseAuth.userUID
        )[0];
        if (myProfile) {
          if (myProfile.profilePicture) {
            this.profilePictureURL = myProfile.profilePicture;
          }
          if (myProfile.name) {
            this.displayName = myProfile.name;
          }
        }
        if (firebase.auth().currentUser && this.displayName === '') {
          if (firebase.auth().currentUser.displayName) {
            this.displayName = firebase
              .auth()
              .currentUser.displayName.split(' ')[0];
          }
          if (firebase.auth().currentUser && this.profilePictureURL === '') {
            if (firebase.auth().currentUser.photoURL) {
              this.profilePictureURL = firebase.auth().currentUser.photoURL;
            }
          }
        }
        if (this.profilePictureURL === '') {
          this.profilePictureURL = '../../assets/images/user.png';
        }
        if (this.displayName === '') {
          this.displayName = 'User';
        }
      });
      this._firebaseCrudService.getCollection('shopping-cart').subscribe((data:IFirebaseBook[])=>{
        this.cartItems=data.filter(item=>item.ordered!=='ordered' && item.userUID===this._firebaseAuth.userUID).length;
      })
  }

  signOut() {
    this._firebaseAuth.signOut();
    if (localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY);
    }
    if (localStorage.getItem(TOKEN_EXP_KEY)) {
      localStorage.removeItem(TOKEN_EXP_KEY);
    }
  }
}
