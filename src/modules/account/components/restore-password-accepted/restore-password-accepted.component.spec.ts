import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordAcceptedComponent } from './restore-password-accepted.component';

describe('RestorePasswordAcceptedComponent', () => {
  let component: RestorePasswordAcceptedComponent;
  let fixture: ComponentFixture<RestorePasswordAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
