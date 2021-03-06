import { AuthGuard } from './authguard';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarpentryServiceService } from './services/carpentry-service.service';
import { CarpentryServiceTypeService } from './services/carpentry-service-type.service';
import { FabricService } from './services/fabric.service';
import { FabricTypeService } from './services/fabric-type.service';
import { ReferencePictureService } from './services/reference-picture.service';
import { CarpentryServiceComponent } from './carpentry-service/carpentry-service.component';
import { FabricComponent } from './fabric/fabric.component';
import { ReferencePictureComponent } from './reference-picture/reference-picture.component';
import { AddCarpentryServiceComponent } from './add-carpentry-service/add-carpentry-service.component';
import { AddCarpentryServiceTypeComponent } from './add-carpentry-service-type/add-carpentry-service-type.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';

import { appRoutes } from './routes';
import { ChatService } from './services/chat.service';
import { environment } from '../../src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { RatingComponent } from './rating/rating.component';
import { RatingService } from './services/rating.service';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { AddReferencePictureComponent } from './add-reference-picture/add-reference-picture.component';
import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactService } from './services/contact.service';
import { AddFabricComponent } from './add-fabric/add-fabric.component';
import { AddFabricTypeComponent } from './add-fabric-type/add-fabric-type.component';
import { PriceEstimateComponent } from './price-estimate/price-estimate.component';
import { MatDialogModule, MatButtonModule, MatTableModule, MatCheckboxModule,
 MatCardModule, MatSelectModule, MatAutocompleteModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import {SlideshowModule} from 'ng-simple-slideshow';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { RequestOfferComponent } from './request-offer/request-offer.component';
import { OfferRequestService } from './services/offer-request.service';
import { AgGridModule } from 'ag-grid-angular';
import { PictureService } from './services/picture.service';
import { OfferFormPopupComponent } from './offer-form-popup/offer-form-popup.component';
import { AuthService } from './services/auth.service';
import { NotifierModule } from "angular-notifier";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ContactComponent,
    AboutUsComponent,
    HomepageComponent,
    CarpentryServiceComponent,
    FabricComponent,
    ReferencePictureComponent,
    AddCarpentryServiceComponent,
    AddCarpentryServiceTypeComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserItemComponent,
    RatingComponent,
    AddRatingComponent,
    AddReferencePictureComponent,
    ContactComponent,
    AddContactComponent,
    AddFabricComponent,
    AddFabricTypeComponent,
    PriceEstimateComponent,
    AdminAreaComponent,
    MapComponent,
    OfferFormComponent,
    RequestOfferComponent,
    OfferFormPopupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3SIMdMnmH5cEa3Ybm7ZxYriIHRnjFSWA'
    }),
    SlideshowModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatListModule,
    AgGridModule.withComponents([]),
    NotifierModule
  ],
  entryComponents: [
    PriceEstimateComponent,
    OfferFormPopupComponent
  ],
  providers: [CarpentryServiceService,
    CarpentryServiceTypeService, FabricService, FabricTypeService, ContactService,
    ReferencePictureService, RatingService, UserService, AuthGuard, ChatService,
    AngularFireAuth, OfferRequestService, PictureService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
