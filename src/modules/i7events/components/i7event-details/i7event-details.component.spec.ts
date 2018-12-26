import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I7EventDetailsComponent } from './i7event-details.component';

describe('EventDetailsComponent', () => {
  let component: I7EventDetailsComponent;
  let fixture: ComponentFixture<I7EventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7EventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I7EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
