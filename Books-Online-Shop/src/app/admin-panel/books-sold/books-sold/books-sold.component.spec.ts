import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSoldComponent } from './books-sold.component';

describe('BooksSoldComponent', () => {
  let component: BooksSoldComponent;
  let fixture: ComponentFixture<BooksSoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksSoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
