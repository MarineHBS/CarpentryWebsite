import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBottomComponent } from './page-bottom.component';

describe('PageBottomComponent', () => {
  let component: PageBottomComponent;
  let fixture: ComponentFixture<PageBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
