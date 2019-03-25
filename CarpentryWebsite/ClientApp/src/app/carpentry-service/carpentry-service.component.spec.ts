import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpentryServiceComponent } from './carpentry-service.component';

describe('CarpentryServiceComponent', () => {
  let component: CarpentryServiceComponent;
  let fixture: ComponentFixture<CarpentryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpentryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpentryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
