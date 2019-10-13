import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOfferComponent } from './request-offer.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { appRoutes } from '../routes';
import { RouterTestingModule } from '@angular/router/testing';

describe('RequestOfferComponent', () => {
  let component: RequestOfferComponent;
  let fixture: ComponentFixture<RequestOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
