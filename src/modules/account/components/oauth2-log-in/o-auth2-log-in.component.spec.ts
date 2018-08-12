import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuth2LogInComponent } from './o-auth2-log-in.component';

describe('OAuth2LogInComponent', () => {
  let component: OAuth2LogInComponent;
  let fixture: ComponentFixture<OAuth2LogInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OAuth2LogInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OAuth2LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
