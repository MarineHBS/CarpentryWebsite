import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatMessage } from '../models/chat';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  asd: any;

  user: firebase.User;
  chatMessages: AngularFireList<any>;
  chatMessage: ChatMessage;
  userName: Observable<string>;


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
      this.getUser().subscribe(a => {
        // this.userName = a.displayName;
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    const name = `/users/${userId}/displayName`;
    console.log(' ÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁ', this.db.object(path));
    console.log(' ÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁÁ', this.db.object(name));
    return of(this.db.object(path));
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
      // userName: this.userName,
      userName: 'testuser',
      email: email
    });
  }

  getMessages(): AngularFireList<ChatMessage[]> {

    console.log('' + this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey();
    }));
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
