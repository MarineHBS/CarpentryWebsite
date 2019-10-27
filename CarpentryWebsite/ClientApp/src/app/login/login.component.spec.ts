import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { UserService } from '../services/user.service';
import { LoginComponent } from './login.component';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let location: Location;
    let router: Router;

    window.alert = jest.fn();

    let loginSpy;

    const mockUserService = {
        login: () => {
            return '';
        },
        isLoggedIn: () => {
            return false;
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
            declarations: [],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: 'BASE_URL', useFactory: getBaseUrl },
                { provide: UserService, useValue: mockUserService },
                FormBuilder, MatDialog
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        loginSpy = spyOn(mockUserService, 'login').and.callThrough();
        router = TestBed.get(Router);
        location = TestBed.get(Location);

        router.initialNavigation();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('closeError should stop showing error', () => {
        // when
        component.closeErrorDiv();

        // then
        expect(component.showError).toBeFalsy();
    });
});
