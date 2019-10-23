import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroller') private feedContainer: ElementRef;
  userNameForm: FormGroup;
  loggedIn = false;

  constructor(private _fb: FormBuilder, private chatService: ChatService,
    private router: Router, private authService: AuthService) {
    this.userNameForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      displayName: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.authService.currentUserId === '') {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  scrolltoBottom(): void {
    if (this.feedContainer) {
      this.feedContainer.nativeElement.scrollTop
        = this.feedContainer.nativeElement.scrollHeight;
    }
  }

  ngAfterViewChecked(): void {
    this.scrolltoBottom();
  }

  login() {
    if (!this.userNameForm.valid) {
      return;
    }
    this.authService.signUp(this.email.value, this.password.value, this.displayName.value)
      .then(resolve => this.loggedIn = true).catch(error => window.alert(error));

  }

  get email() { return this.userNameForm.get('email'); }
  get password() { return this.userNameForm.get('password'); }
  get displayName() { return this.userNameForm.get('displayName'); }
}
