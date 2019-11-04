import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { ChatMessage } from '../models/chat';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let location: Location;
  let router: Router;

  const mockUser = {
    displayName: "user",
    email: "emai@gmail.com"
  };

  const mockAuthService = {
    authUser: () => {
      return of(mockUser);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: AuthService, useValue: mockAuthService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
    const chatMessage: ChatMessage = new ChatMessage();
    chatMessage.message = 'message';
    chatMessage.timeSent = new Date('2005');
    chatMessage.email = 'email';
    chatMessage.userName = 'name';
    component.chatMessage = chatMessage;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should initialize variables', () => {
    // when
    component.ngOnInit();

    // then
    expect(component.messageContent).toEqual('message');
    expect(component.timeStamp).toEqual(new Date('2005'));
    expect(component.userEmail).toEqual('email');
    expect(component.userName).toEqual('name');
  });
});
