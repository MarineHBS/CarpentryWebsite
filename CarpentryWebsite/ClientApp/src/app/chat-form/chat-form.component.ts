import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;
  @Input() userId: string;
  private readonly notifier: NotifierService;

  constructor(private chat: ChatService, notifierService: NotifierService) {
    this.notifier = notifierService;
   }

  ngOnInit() {
  }

  send() {
    this.notifier.notify("success", "You are awesome! I mean it!");
    if (this.message !== '') {
      this.chat.sendMessageWithUser(this.message, this.userId);
    }
    this.message = '';
  }

  handleSubmit(event) {
    if (event.keyCode === 13 && this.message !== '') {
      this.send();
    }
  }

}
