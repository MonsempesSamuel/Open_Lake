import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewElementsComponent } from './overview-elements.component';

describe('OverviewElementsComponent', () => {
  let component: OverviewElementsComponent;
  let fixture: ComponentFixture<OverviewElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
