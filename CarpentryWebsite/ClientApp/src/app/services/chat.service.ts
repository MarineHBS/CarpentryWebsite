import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import { ChatMessage } from '../models/chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  asd: any;

  user: any;
  chatMessages: AngularFireList<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    /*this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });*/
   }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'blyat';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      // userName: this.userName,
      userName: 'rofl',
      email: email
    });
    console.log('Called sendmessage()');
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
