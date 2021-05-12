import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {showNav,hideNav} from '../../../navigation/state/nav-visibility/nav-visibility.actions';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit, OnDestroy {
  nav$: Observable<boolean>;
  constructor(private store:Store<{nav:boolean}>) {
    this.nav$=store.select('nav');
  }

  ngOnInit(): void {
    this.hideNav();
  }
  ngOnDestroy(): void {
    this.showNav();
  }
  hideNav() {
    this.store.dispatch(hideNav());
  }
  showNav() {
    this.store.dispatch(showNav());
  }
}
