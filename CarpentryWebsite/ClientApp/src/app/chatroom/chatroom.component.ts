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
  loginForm: FormGroup;
  loggedIn = false;
  userId: string;
  registerChosen = false;

  constructor(private _fb: FormBuilder, private chatService: ChatService,
    private router: Router, private authService: AuthService) {
    this.userNameForm = this._fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      displayName: ['', [Validators.required]]
    });
    this.loginForm = this._fb.group({
      loginEmail: ['', [Validators.required]],
      loginPassword: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.authService.currentUserId === '') {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
    this.userId = this.authService.currentUserId;
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

  register() {
    if (!this.userNameForm.valid) {
      return;
    }

    this.authService.signUp(this.email.value, this.password.value, this.displayName.value)
      .then(resolve => {
        this.loggedIn = true;
        this.userId = this.authService.currentUserId;
      }).catch(error => window.alert(this.mapError(error)));
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.get('loginEmail').value,
     this.loginForm.get('loginPassword').value)
      .then(resolve => {
        this.loggedIn = true;
        this.userId = this.authService.currentUserId;
      }).catch(error => window.alert(this.mapError(error)));
  }

  mapError (error: string): string {
    console.log('maperror' + error);
    // tslint:disable-next-line: triple-equals
    if (error == 'Error: The email address is badly formatted.') {
      return 'Nem megfelelő e-mail formátum';
      // tslint:disable-next-line: triple-equals
    } else if ( error == 'Error: Password should be at least 6 characters') {
      return 'A jelszónak legalább 6 karakterből kell állnia';
      // tslint:disable-next-line: triple-equals
    } else if ( error == 'Error: There is no user record corresponding to this identifier. The user may have been deleted.') {
      return 'Nem található ilyen felhasználó';
      // tslint:disable-next-line: triple-equals
    } else if ( error == 'Error: The password is invalid or the user does not have a password.') {
      return 'Nem megfelelő a jelszó';
    } else {
      return error;
    }
  }

  existingUser() {
    this.registerChosen = false;
  }

  notExistingUser() {
    this.registerChosen = true;
  }

  get email() { return this.userNameForm.get('email'); }
  get password() { return this.userNameForm.get('password'); }
  get displayName() { return this.userNameForm.get('displayName'); }
  get loginEmail() { return this.userNameForm.get('loginEmail'); }
  get loginPassword() { return this.userNameForm.get('loginPassword'); }
}
