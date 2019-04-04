import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferencePictureComponent } from './add-reference-picture.component';

describe('AddReferencePictureComponent', () => {
  let component: AddReferencePictureComponent;
  let fixture: ComponentFixture<AddReferencePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReferencePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferencePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
