import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I7EventLocationComponent } from './i7-event-location.component';

describe('I7EventLocationComponent', () => {
  let component: I7EventLocationComponent;
  let fixture: ComponentFixture<I7EventLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7EventLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I7EventLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
