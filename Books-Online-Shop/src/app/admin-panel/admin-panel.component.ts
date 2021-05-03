import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TOKEN_EXP_KEY, TOKEN_KEY } from '../shared/constants/constants';
import { FirebaseAuthService } from '../shared/services/firebase-auth/firebase-auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  
  constructor(private _firebaseAuth: FirebaseAuthService) {}

 ngOnInit():void{}

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
