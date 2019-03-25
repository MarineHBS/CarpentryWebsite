import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricTypeComponent } from './fabric-type.component';

describe('FabricTypeComponent', () => {
  let component: FabricTypeComponent;
  let fixture: ComponentFixture<FabricTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
