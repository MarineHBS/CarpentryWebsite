import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
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
        fixture = TestBed.createComponent(RegisterComponent);
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

    it('properties should return the correct data on the form', () => {
        // given
        component.registerForm.controls['userName'].setValue('testName');
        component.registerForm.controls['email'].setValue('testEmail');
        component.registerForm.controls['password'].setValue('testPassword');
        component.registerForm.controls['passwordConfirmation'].setValue('testPassword');

        const realName = component.registerForm.get('userName');
        const realEmail = component.registerForm.get('email');
        const realPassword = component.registerForm.get('password');
        const realPasswordConfirmation = component.registerForm.get('passwordConfirmation');

        // when
        const expectedName = component.userName;
        const expectedEmail = component.email;
        const expectedPassword = component.password;
        const expectedPasswordConfirmation = component.passwordConfirmation;

        // then
        expect(expectedName).toEqual(realName);
        expect(expectedEmail).toEqual(realEmail);
        expect(expectedPassword).toEqual(realPassword);
        expect(expectedPasswordConfirmation).toEqual(realPasswordConfirmation);
      });
});
