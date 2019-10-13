import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomComponent } from './chatroom.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { getBaseUrl } from '../../main';
import { APP_BASE_HREF } from '@angular/common';
import { appRoutes } from '../routes';

describe('ChatroomComponent', () => {
  let component: ChatroomComponent;
  let fixture: ComponentFixture<ChatroomComponent>;

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
    fixture = TestBed.createComponent(ChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
