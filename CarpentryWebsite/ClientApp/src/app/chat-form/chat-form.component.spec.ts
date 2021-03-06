import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFormComponent } from './chat-form.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { ChatService } from '../services/chat.service';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user.service';

describe('ChatFormComponent', () => {
  let component: ChatFormComponent;
  let fixture: ComponentFixture<ChatFormComponent>;

  let sendMessageWithUserSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        ChatService, NotifierService, UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sendMessageWithUserSpy = spyOn(ChatService.prototype, 'sendMessageWithUser').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('send should call service', () => {
    // given
    component.message = 'message';
    component.userId = 'id';

    // when
    component.send();

    // then
    expect(sendMessageWithUserSpy).toHaveBeenCalledWith('message', 'id');
  });
});
