import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatMessage } from '../models/chat';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

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

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'testemail@email';
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

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      (now.getUTCMinutes()) + ':' +
      now.getUTCSeconds();
    return (date + ' ' + time);
  }
}
