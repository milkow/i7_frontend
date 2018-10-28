import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordSetComponent } from './restore-password-set.component';

describe('RestorePasswordSetComponent', () => {
  let component: RestorePasswordSetComponent;
  let fixture: ComponentFixture<RestorePasswordSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
