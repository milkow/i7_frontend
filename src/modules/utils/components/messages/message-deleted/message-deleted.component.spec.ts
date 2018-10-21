import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDeletedComponent } from './message-deleted.component';

describe('MessageDeletedComponent', () => {
  let component: MessageDeletedComponent;
  let fixture: ComponentFixture<MessageDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
