import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUsersComponent } from './event-users.component';

describe('EventUsersComponent', () => {
  let component: EventUsersComponent;
  let fixture: ComponentFixture<EventUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
