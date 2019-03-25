import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsComponentComponent } from './ratings.component';

describe('RatingsComponentComponent', () => {
  let component: RatingsComponentComponent;
  let fixture: ComponentFixture<RatingsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
