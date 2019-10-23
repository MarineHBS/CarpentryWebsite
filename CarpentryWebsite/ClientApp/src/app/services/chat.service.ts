import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatMessage } from '../models/chat';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserRegistration } from '../models/user-registration';
import { User } from '../models/user-model';

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
    const userId = this.user.uid;
    // const path = `/users/${userId}`;
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
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      timeSent: timestamp,
      message: msg,
      userName: this.displayName,
      email: email
    });
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    return this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

  sendMessageWithUser(msg: string, uid: string, displayName?: string) {
    const timestamp = this.getTimeStamp();
    let userName;
    this.getDisplayName(uid).valueChanges().subscribe(
      res => {
        console.log('LUL', res);
        // this.displayName = res.displayName;
      }
    );
    if (this.displayName) {
      userName = this.displayName;
    } else {
      userName = 'admin';
    }
    this.chatMessages = this.getMessagesWithUser(uid);
    this.chatMessages.push({
      timeSent: timestamp,
      message: msg,
      userName: userName,
    });
  }

  getMessagesWithUser(uid: string): AngularFireList<ChatMessage[]> {
    return this.db.list('users/' + uid + '/messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

  setDisplayName(uid: string) {
    this.getDisplayName(uid).valueChanges().subscribe(
      res => {
        console.log('LUL' + res);
        // this.displayName = res.displayName;
      }
    );
    console.log('HELP', this.getDisplayName(uid));
  }

  getDisplayName(uid: string): AngularFireObject<User[]> {
    return this.db.object('users/' + uid);
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();

    const hours = now.getUTCHours() + 2;
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
