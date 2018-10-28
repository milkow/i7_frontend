import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I7EventPhotosComponent } from './i7event-photos.component';

describe('EventPhotosComponent', () => {
  let component: I7EventPhotosComponent;
  let fixture: ComponentFixture<I7EventPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7EventPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I7EventPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
