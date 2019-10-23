import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

}
