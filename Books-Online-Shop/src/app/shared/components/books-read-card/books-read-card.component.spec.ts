import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksReadCardComponent } from './books-read-card.component';

describe('WishlistCardComponent', () => {
  let component: BooksReadCardComponent;
  let fixture: ComponentFixture<BooksReadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksReadCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksReadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
