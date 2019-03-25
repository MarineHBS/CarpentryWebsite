import { AuthGuard } from './authguard';
import { LoginComponent } from './login/login.component';
import { FetchLocationDetailsComponent } from './fetchlocation-details/fetchlocation-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchLocationComponent } from './fetchlocations/fetchlocation.component';
import { LocationService } from './services/locationservice.service';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { RatingsComponentComponent } from './ratings/ratings.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarpentryServiceService } from './services/carpentry-service.service';
import { CarpentryServiceTypeService } from './services/carpentry-service-type.service';
import { FabricService } from './services/fabric.service';
import { FabricTypeService } from './services/fabric-type.service';
import { ReferencePictureService } from './services/reference-picture.service';
import { FabricTypeComponent } from './fabric-type/fabric-type.component';
import { CarpentryServiceComponent } from './carpentry-service/carpentry-service.component';
import { CarpentryServiceTypeComponent } from './carpentry-service-type/carpentry-service-type.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    FetchLocationComponent,
    FetchLocationDetailsComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    RatingsComponentComponent,
    ContactUsComponent,
    AboutUsComponent,
    HomepageComponent,
    FabricTypeComponent,
    CarpentryServiceComponent,
    CarpentryServiceTypeComponent,
    FabricComponent,
    ReferencePictureComponent,
    AddCarpentryServiceComponent,
    AddCarpentryServiceTypeComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [LocationService, CarpentryServiceService,
    CarpentryServiceTypeService, FabricService, FabricTypeService,
    ReferencePictureService, UserService, AuthGuard, ChatService,
  AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
