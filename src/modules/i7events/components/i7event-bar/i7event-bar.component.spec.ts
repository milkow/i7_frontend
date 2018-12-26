import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I7eventBarComponent } from './i7event-bar.component';

describe('I7eventBarComponent', () => {
  let component: I7eventBarComponent;
  let fixture: ComponentFixture<I7eventBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7eventBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I7eventBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
