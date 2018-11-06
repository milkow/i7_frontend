import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I7eventListComponent } from './i7event-list.component';

describe('I7eventListComponent', () => {
  let component: I7eventListComponent;
  let fixture: ComponentFixture<I7eventListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7eventListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I7eventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
