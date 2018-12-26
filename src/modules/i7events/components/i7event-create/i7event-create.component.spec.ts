import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { I7EventCreateComponent } from './i7event-create.component'

describe('EventCreateComponent', () => {
  let component: I7EventCreateComponent
  let fixture: ComponentFixture<I7EventCreateComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I7EventCreateComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(I7EventCreateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
