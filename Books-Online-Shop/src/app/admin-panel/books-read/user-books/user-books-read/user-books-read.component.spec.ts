import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBooksReadComponent } from './user-books-read.component';

describe('UserBooksReadComponent', () => {
  let component: UserBooksReadComponent;
  let fixture: ComponentFixture<UserBooksReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBooksReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBooksReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
