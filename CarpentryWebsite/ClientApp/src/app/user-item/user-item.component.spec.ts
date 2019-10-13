import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemComponent } from './user-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';

describe('UserItemComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;

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
    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
