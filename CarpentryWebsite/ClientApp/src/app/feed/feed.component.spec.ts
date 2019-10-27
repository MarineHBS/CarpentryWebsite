import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedComponent } from './feed.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';
import { ChatService } from '../services/chat.service';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  let spyGetMessagesWithUser;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        ChatService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyGetMessagesWithUser = spyOn(ChatService.prototype, 'getMessagesWithUser').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should get new messages', () => {
    // when
    component.ngOnInit();

    // then
    expect(spyGetMessagesWithUser).toHaveBeenCalled();
  });
});
