import { Component } from '@angular/core';
import { FirebaseAuthService } from './shared/services/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Books-Online-Shop';
  constructor(public firebaseAuth:FirebaseAuthService){}
}
