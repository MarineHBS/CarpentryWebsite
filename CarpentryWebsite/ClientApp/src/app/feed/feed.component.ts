import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AngularFireList } from '@angular/fire/database';
import { ChatMessage } from '../models/chat';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() userId: string;
  feed: Observable<ChatMessage[][]>;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    // this.feed = this.chat.getMessages().valueChanges();
    this.feed = this.chat.getMessagesWithUser(this.userId).valueChanges();
    console.log('FEED', this.feed);
  }

  ngOnChanges() {
    // this.feed = this.chat.getMessages().valueChanges();
    this.feed = this.chat.getMessagesWithUser(this.userId).valueChanges();
  }

}
