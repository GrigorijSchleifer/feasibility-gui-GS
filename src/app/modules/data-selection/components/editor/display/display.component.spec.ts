import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProfilesComponent } from './display.component';

describe('DisplayProfilesComponent', () => {
  let component: DisplayProfilesComponent;
  let fixture: ComponentFixture<DisplayProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayProfilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
