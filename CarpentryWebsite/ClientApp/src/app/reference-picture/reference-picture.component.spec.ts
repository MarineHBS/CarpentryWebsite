import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencePictureComponent } from './reference-picture.component';

describe('ReferencePictureComponent', () => {
  let component: ReferencePictureComponent;
  let fixture: ComponentFixture<ReferencePictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferencePictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferencePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
