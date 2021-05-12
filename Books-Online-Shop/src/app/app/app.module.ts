import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from '../navigation/navigation.module';
import { LandingPageModule } from '../landing-page/landing-page.module';
import { DetailedPageModule } from '../detailed-page/detailed-page.module';
import { BooksSearchModule } from '../books-search/books-search.module';
import { NavigationRoutingModule } from '../navigation/navigation-routing.module';
import { LandingPageRoutingModule } from '../landing-page/landing-page-routing.module';
import { DetailedPageRoutingModule } from '../detailed-page/detailed-page-routing.module';
import { BooksSearchRoutingModule } from '../books-search/books-search-routing.module';
import { AuthModule } from '../auth/auth.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { WishlistModule } from '../wishlist/wishlist.module';
import { WishlistRoutingModule } from '../wishlist/wishlist-routing.module';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';
import { ShoppingCartRoutingModule } from '../shopping-cart/shopping-cart-routing.module';
import { ProfileModule } from '../profile/profile.module';
import { ProfileRoutingModule } from '../profile/profile-routing.module';
import { AdminPanelModule } from '../admin-panel/admin-panel.module';

import { FooterComponent } from '../footer/footer.component';
import {firebaseConfig} from '../../../firebaseConfig';
import { BooksReadModule } from '../books-read/books-read.module';
import { BooksReadRoutingModule } from '../books-read/books-read-routing.module';
import { Page404Module } from '../shared/components/page-404/page404.module';
import { Page404RoutingModule } from '../shared/components/page-404/page404-routing.module';
import { StoreModule } from '@ngrx/store';
import {navReducer} from '../navigation/state/nav-visibility/nav-visibility.reducer';
import { fadeNavReducer } from '../navigation/state/nav-fade/nav-fade.reducer';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationModule,
    NavigationRoutingModule,
    LandingPageModule,
    LandingPageRoutingModule,
    DetailedPageModule,
    DetailedPageRoutingModule,
    BooksSearchModule,
    BooksSearchRoutingModule,
    AuthModule,
    AuthRoutingModule,
    WishlistModule,
    WishlistRoutingModule,
    ShoppingCartModule,
    ShoppingCartRoutingModule,
    ProfileModule,
    ProfileRoutingModule,
    AdminPanelModule,
    BooksReadModule,
    BooksReadRoutingModule,
    Page404Module,
    Page404RoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: 'AIzaSyBQ5gtL70XQ48con8rRedbKzX2b13fWCuI',
      authDomain: 'books-app-project-307817.firebaseapp.com',
      databaseURL:
        'https://books-app-project-307817-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'books-app-project-307817',
      storageBucket: 'books-app-project-307817.appspot.com',
      messagingSenderId: '828802712642',
    }),
    StoreModule.forRoot({nav:navReducer, fadeNav:fadeNavReducer},{}),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
