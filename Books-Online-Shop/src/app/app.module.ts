import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { DetailedPageModule } from './detailed-page/detailed-page.module';
import { BooksSearchModule } from './books-search/books-search.module';
import { NavigationRoutingModule } from './navigation/navigation-routing.module';
import { LandingPageRoutingModule } from './landing-page/landing-page-routing.module';
import { DetailedPageRoutingModule } from './detailed-page/detailed-page-routing.module';
import { BooksSearchRoutingModule } from './books-search/books-search-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { WishlistRoutingModule } from './wishlist/wishlist-routing.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ShoppingCartRoutingModule } from './shopping-cart/shopping-cart-routing.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileRoutingModule } from './profile/profile-routing.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { AdminPanelRoutingModule } from './admin-panel/admin-panel-routing.module';
import { FooterComponent } from './footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
    
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
    AdminPanelRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
