import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { I7EventUsersComponent } from './i7event-users.component';

describe('EventUsersComponent', () => {
  let component: I7EventUsersComponent;
  let fixture: ComponentFixture<I7EventUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7EventUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I7EventUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
