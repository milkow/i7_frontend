import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I7EventSettingsComponent } from './i7-event-settings.component';

describe('I7EventSettingsComponent', () => {
  let component: I7EventSettingsComponent;
  let fixture: ComponentFixture<I7EventSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7EventSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I7EventSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
