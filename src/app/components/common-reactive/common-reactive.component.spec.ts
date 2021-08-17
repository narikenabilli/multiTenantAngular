import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonReactiveComponent } from './common-reactive.component';

describe('CommonReactiveComponent', () => {
  let component: CommonReactiveComponent;
  let fixture: ComponentFixture<CommonReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonReactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
