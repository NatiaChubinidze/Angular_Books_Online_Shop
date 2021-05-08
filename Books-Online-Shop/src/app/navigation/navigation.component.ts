import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase/app';

import { IProfile } from '../profile/shared/interfaces/profile.interface';
import { EXP_TIME, TOKEN_EXP_KEY, TOKEN_KEY } from '../shared/constants/constants';
import { AuthService } from '../shared/services/auth/auth.service';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { FireBaseCrudService } from '../shared/services/firebase-crud/firebase-crud.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() fadeSteps:number;
  profilePictureURL:string = '';
  displayName:string = '';
  constructor(
    private _auth: AuthService,
    private _firebaseAuth: FirebaseAuthService,
    private _firebaseCrudService: FireBaseCrudService,
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

    this._firebaseAuth.currentUser$.subscribe((data: any) => {
      console.log(data);
      if(data){
      this._firebaseAuth.userUID = data.uid;
      }
    });
    this._firebaseCrudService
      .getCollection('profile')
      .subscribe((data: IProfile[]) => {
        const myProfile = data.filter(
          (profile) => profile.userUID === this._firebaseAuth.userUID
        )[0];
        console.log(myProfile);
        if (myProfile) {
          console.log("profile exists");
          if(myProfile.profilePicture){
            console.log(myProfile.profilePicture);
            this.profilePictureURL=myProfile.profilePicture;
          }
          if(myProfile.name){
            console.log("profile name exists");
            this.displayName=myProfile.name;
          }
        } 
         if(firebase.auth().currentUser && this.displayName===''){
          console.log("firebase user exists");
          if(firebase.auth().currentUser.displayName){
            console.log("firebase displayname exists");
            this.displayName=firebase.auth().currentUser.displayName.split(' ')[0];
          }
          if(firebase.auth().currentUser && this.profilePictureURL===''){
          if(firebase.auth().currentUser.photoURL){
            this.profilePictureURL=firebase.auth().currentUser.photoURL;
          }
        } 
      }
        if(this.profilePictureURL===''){
          console.log("default values");
          this.profilePictureURL="../../assets/images/user.png";
        }
        if(this.displayName===''){this.displayName='User';}
        console.log(this.displayName);
        })
    
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
