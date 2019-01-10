import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarPcComponent } from './searchbar-pc.component';

describe('SearchbarPcComponent', () => {
  let component: SearchbarPcComponent;
  let fixture: ComponentFixture<SearchbarPcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchbarPcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
