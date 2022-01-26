import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgPopupComponent } from './bg-popup.component';

describe('BgPopupComponent', () => {
  let component: BgPopupComponent;
  let fixture: ComponentFixture<BgPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BgPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
