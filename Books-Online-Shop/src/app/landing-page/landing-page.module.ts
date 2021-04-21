import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { BookCardsComponent } from '../shared/components/book-cards/book-cards.component';
import { BookCardsModule } from '../shared/components/book-cards.module';



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,BookCardsModule
  ],
  exports:[LandingPageComponent]
})
export class LandingPageModule { }
