import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBooksBoughtComponent } from './user-books-bought.component';

describe('UserBooksBoughtComponent', () => {
  let component: UserBooksBoughtComponent;
  let fixture: ComponentFixture<UserBooksBoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBooksBoughtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBooksBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
