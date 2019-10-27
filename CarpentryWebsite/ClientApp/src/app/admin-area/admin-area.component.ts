import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { OfferRequestService } from '../services/offer-request.service';
import { MatDialog } from '@angular/material';
import { OfferFormPopupComponent } from '../offer-form-popup/offer-form-popup.component';
import { PictureService } from '../services/picture.service';
import { ChatService } from '../services/chat.service';
import { Observable } from 'rxjs';
import { UserRegistration } from '../models/user-registration';
import { User } from '../models/user-model';
import { ChatMessage } from '../models/chat';
import { AuthService } from '../services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrls: ['./admin-area.component.css']
})
export class AdminAreaComponent implements OnInit, AfterViewChecked, OnChanges {
  @ViewChild('scroller') private messageContainer: ElementRef;

  isLoggedIn: boolean;
  defaultColDef: any;
  rowSelection;
  message: string;
  showModal = false;

  columnDefs = [
    { headerName: 'Név', field: 'name', sortable: true, filter: true },
    { headerName: 'Email-cím', field: 'emailAddress', sortable: true, filter: true },
    { headerName: 'Üzenet', field: 'message', sortable: true, filter: true }
  ];

  rowData: any;
  pictureName: string;
  users: Observable<User[][]>;
  usersMessages: Observable<ChatMessage[][]>;
  userId;
  adminUid;
  userIsSelected = false;
  private readonly notifier: NotifierService;

  constructor(userService: UserService, private offerRequestService: OfferRequestService,
     private dialog: MatDialog, private pictureService: PictureService, private chatService: ChatService,
     private authService: AuthService, notifierService: NotifierService) {
      this.notifier = notifierService;
    this.isLoggedIn = userService.isLoggedIn();
    this.defaultColDef = {
      width: 300,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.rowData = offerRequestService.getOfferRequests();
    this.rowSelection = 'single';
    this.chatService.messageSentEvent.subscribe(sentBy => {
      console.log('event received', sentBy);
      this.notifier.notify("success", "Új üzenet érkezett");
    });
  }

  scrolltoBottom(): void {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTop
        = this.messageContainer.nativeElement.scrollHeight;
    }
  }

  ngOnInit() {
    this.userIsSelected = false;
    this.users = this.chatService.getUsers().valueChanges();
    this.authService.login('admin@admin.hu', 'admin1');
    this.authService.authUser().subscribe( u => this.adminUid = u.uid);
  }

  ngOnChanges() {
    this.users = this.chatService.getUsers().valueChanges();
  }

  ngAfterViewChecked () {
    this.scrolltoBottom();
  }

  setUsersMessages() {
    this.usersMessages = this.chatService.getUserMessages(this.userId).valueChanges();
  }

  userSelected(uid) {
    this.userIsSelected = true;
    this.userId = uid;
    this.setUsersMessages();
  }

  send() {
    if (this.message !== '') {
      this.chatService.sendMessageWithUser(this.message, this.userId, this.adminUid);
    }
    this.message = '';
  }

  handleSubmit(event) {
    if (event.keyCode === 13 && this.message !== '') {
      this.send();
    }
  }

  onRowSelected(event) {
    if (event.node.selected) {
      if (event.node.data.pictureId === null) {
        this.dialog.open(OfferFormPopupComponent, {
          panelClass: 'offer-form-popup-container',
          maxHeight: '90vh',
          data: {
            offerDetails: event.node.data
          }
        });
        return;
      }
      this.message = event.node.data.message;
      this.pictureService.getPictureDetails(event.node.data.pictureId).subscribe(res => {
        this.pictureName = res.pictureName;
        this.dialog.open(OfferFormPopupComponent, {
          panelClass: 'offer-form-popup-container',
          maxHeight: '90vh',
          data: {
            offerDetails: event.node.data,
            pictureName: this.pictureName
          }
        });
      });
    }
  }
}
