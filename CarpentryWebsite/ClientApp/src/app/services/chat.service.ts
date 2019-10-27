import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatMessage } from '../models/chat';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserRegistration } from '../models/user-registration';
import { User } from '../models/user-model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  asd: any;

  user: firebase.User;
  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  displayName: string;

  private messageSentBy;
  @Output() messageSentEvent: EventEmitter<string> = new EventEmitter();

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth,
    private authService: AuthService) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.displayName = this.getUser();
    });
  }

  getUser() {
    return this.authService.getDisplayName();
  }

  getUsers(): AngularFireList<User[]> {
    const path = '/users';
    return this.db.list('users', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

  getUserMessages(userId): AngularFireList<ChatMessage[]> {
    console.log('users/' + userId + '/messages');
    return this.db.list('users/' + userId + '/messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages.push({
      timeSent: timestamp,
      message: msg,
      userName: this.displayName,
      email: email
    });
  }

  sendMessageWithUser(msg: string, uid: string, adminUid?: string) {
    const timestamp = this.getTimeStamp();
    this.getDisplayName(uid).valueChanges().pipe(take(1)).subscribe(
      res => {
        // tslint:disable-next-line: no-shadowed-variable
        let userName;
        let email;
        if (adminUid) {
          userName = 'admin';
          this.getDisplayName(adminUid).valueChanges().pipe(take(1)).subscribe(
            adminUser => {
              email = adminUser.email;
              this.chatMessages = this.getMessagesWithUser(uid);
              this.chatMessages.push({
                timeSent: timestamp,
                message: msg,
                userName: userName,
                email: email
              });
            }
          );
        } else {
          userName = res.displayName;
          email = res.email;
          this.messageSentBy = res.displayName;
          this.messageSentEvent.emit(this.messageSentBy);
          this.chatMessages = this.getMessagesWithUser(uid);
          this.chatMessages.push({
            timeSent: timestamp,
            message: msg,
            userName: userName,
            email: email
          });
        }
      }
    );
  }

  getMessagesWithUser(uid: string): AngularFireList<ChatMessage[]> {
    return this.db.list('users/' + uid + '/messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

  setDisplayName(uid: string) {
    this.getDisplayName(uid).valueChanges().pipe(take(1)).subscribe(
      res => {
        console.log('LUL' + res);
        // this.displayName = res.displayName;
      }
    );
    console.log('HELP', this.getDisplayName(uid));
  }

  getDisplayName(uid: string): AngularFireObject<User> {
    return this.db.object('users/' + uid);
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();

    const hours = now.getUTCHours() + 1;
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    let time = '';
    if (hours < 10) {
      time += '0' + hours;
    } else {
      time += hours;
    }
    time += ":";

    if (minutes < 10) {
      time += '0' + minutes;
    } else {
      time += minutes;
    }
    time += ":";

    if (seconds < 10) {
      time += '0' + seconds;
    } else {
      time += seconds;
    }

    return (date + ' ' + time);
  }
}
