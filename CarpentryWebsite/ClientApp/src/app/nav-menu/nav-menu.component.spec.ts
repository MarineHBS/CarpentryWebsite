import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { UserService } from '../services/user.service';
import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  let logoutSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    logoutSpy = spyOn(UserService.prototype, 'logout').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout should call logout', () => {
    // when
    component.logout();

    // then
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('collapse should set isExpanded to false', () => {
    // when
    component.collapse();

    // then
    expect(component.isExpanded).toBeFalsy();
  });

  it('toggle should set isExpanded to the opposite', () => {
    // when
    component.toggle();
    expect(component.isExpanded).toBeTruthy();
    component.toggle();
    expect(component.isExpanded).toBeFalsy();
  });
});
