import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFabricTypeComponent } from './add-fabric-type.component';

describe('AddFabricTypeComponent', () => {
  let component: AddFabricTypeComponent;
  let fixture: ComponentFixture<AddFabricTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFabricTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFabricTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
