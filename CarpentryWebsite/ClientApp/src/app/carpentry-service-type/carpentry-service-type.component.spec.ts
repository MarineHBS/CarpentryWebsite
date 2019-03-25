import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpentryServiceTypeComponent } from './carpentry-service-type.component';

describe('CarpentryServiceTypeComponent', () => {
  let component: CarpentryServiceTypeComponent;
  let fixture: ComponentFixture<CarpentryServiceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpentryServiceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpentryServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
