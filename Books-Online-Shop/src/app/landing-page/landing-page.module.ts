import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { BookCardsModule } from '../shared/components/book-cards.module';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,BookCardsModule,RouterModule
  ],
  exports:[LandingPageComponent]
})
export class LandingPageModule { }
