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


@NgModule({
  declarations: [
    AppComponent
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
    AuthRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
