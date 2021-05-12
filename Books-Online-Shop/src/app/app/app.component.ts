import { Component, HostListener } from '@angular/core';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fadeNav } from '../navigation/state/nav-fade/nav-fade.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nav$: Observable<boolean>;
  fadeNav$:Observable<number>;
  scrolled:boolean=false;
  title = 'Books-Online-Store';
  constructor(public firebaseAuth:FirebaseAuthService, private store:Store<any>){
    this.nav$=this.store.select('nav');
    this.fadeNav$=this.store.select('fadeNav');
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const numb = window.scrollY;
    if(numb<15){
      this.store.dispatch(fadeNav({fadeSteps:0}));
    }
    if(numb>15){
     this.store.dispatch(fadeNav({fadeSteps:1}));
    }
    if(numb>25){
      this.store.dispatch(fadeNav({fadeSteps:2}));
    }
    if(numb>40){
      this.store.dispatch(fadeNav({fadeSteps:3}));
    }
    if(numb>60){
      this.store.dispatch(fadeNav({fadeSteps:4}));
    }
    if(numb>80){
      this.store.dispatch(fadeNav({fadeSteps:5}));
    }
    if(numb>90){
      this.store.dispatch(fadeNav({fadeSteps:6}));
    }
    if (numb >= 100){
      this.scrolled = true;
      
    }
    else {
      this.scrolled = false;
    }
  }
}
