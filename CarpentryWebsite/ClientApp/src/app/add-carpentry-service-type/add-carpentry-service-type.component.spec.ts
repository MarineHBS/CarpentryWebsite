import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarpentryServiceTypeComponent } from './add-carpentry-service-type.component';

describe('AddCarpentryServiceTypeComponent', () => {
  let component: AddCarpentryServiceTypeComponent;
  let fixture: ComponentFixture<AddCarpentryServiceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarpentryServiceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarpentryServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
