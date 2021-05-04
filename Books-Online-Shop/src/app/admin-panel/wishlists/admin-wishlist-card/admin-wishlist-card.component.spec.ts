import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWishlistCardComponent } from './admin-wishlist-card.component';

describe('CardComponent', () => {
  let component: AdminWishlistCardComponent;
  let fixture: ComponentFixture<AdminWishlistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWishlistCardComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWishlistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
