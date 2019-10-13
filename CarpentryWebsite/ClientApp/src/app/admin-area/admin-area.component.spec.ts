import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAreaComponent } from './admin-area.component';
import { AppModule } from '../app.module';
import { getBaseUrl } from '../../main';
import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { FormBuilder } from '@angular/forms';
import { OfferRequestService } from '../services/offer-request.service';
import { UserService } from '../services/user.service';
import { PictureService } from '../services/picture.service';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';

describe('AdminAreaComponent', () => {
  let component: AdminAreaComponent;
  let fixture: ComponentFixture<AdminAreaComponent>;

  const MdDialogMock = {
    open() {
      return {
        afterClosed: () => of()
      };
    }
  };

  let dialogSpy;


  beforeEach(async(() => {
    dialogSpy = spyOn(MdDialogMock, 'open').and.callThrough();
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [ ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: MatDialog, useValue: MdDialogMock },
        FormBuilder, OfferRequestService, UserService,
        PictureService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
