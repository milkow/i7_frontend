import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I7EventDeleteComponent } from './i7event-delete.component';

describe('I7eventDeleteComponent', () => {
  let component: I7EventDeleteComponent;
  let fixture: ComponentFixture<I7EventDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7EventDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I7EventDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
