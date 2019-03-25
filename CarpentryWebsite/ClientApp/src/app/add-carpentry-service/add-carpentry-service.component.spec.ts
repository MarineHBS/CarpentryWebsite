import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarpentryServiceComponent } from './add-carpentry-service.component';

describe('AddCarpentryServiceComponent', () => {
  let component: AddCarpentryServiceComponent;
  let fixture: ComponentFixture<AddCarpentryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarpentryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarpentryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
