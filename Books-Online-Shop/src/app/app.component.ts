import { Component, HostListener } from '@angular/core';
import { FirebaseAuthService } from './shared/services/firebase-auth/firebase-auth.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nav$: Observable<boolean>;
  scrolled:boolean=false;
  fadeSteps:number=0;
  title = 'Books-Online-Shop';
  constructor(public firebaseAuth:FirebaseAuthService, private store:Store<{nav:boolean}>){
    this.nav$=store.select('nav');
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const numb = window.scrollY;
    if(numb<15){
      this.fadeSteps=0;
    }
    if(numb>15){
      this.fadeSteps=1;
    }
    if(numb>25){
      this.fadeSteps=2;
    }
    if(numb>40){
      this.fadeSteps=3;
    }
    if(numb>60){
      this.fadeSteps=4;
    }
    if(numb>80){
      this.fadeSteps=5;
    }
    if(numb>90){
      this.fadeSteps=6;
    }
    if (numb >= 100){
      this.scrolled = true;
      
    }
    else {
      this.scrolled = false;
    }
  }
}
