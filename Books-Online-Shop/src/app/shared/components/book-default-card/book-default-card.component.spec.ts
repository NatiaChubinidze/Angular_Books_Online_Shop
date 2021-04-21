import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDefaultCardComponent } from './book-default-card.component';

describe('BookDefaultCardComponent', () => {
  let component: BookDefaultCardComponent;
  let fixture: ComponentFixture<BookDefaultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDefaultCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDefaultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
