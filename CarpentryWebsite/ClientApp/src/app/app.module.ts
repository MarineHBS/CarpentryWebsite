import { AuthGuard } from './authguard';
import { LoginComponent } from './login/login.component';
import { FetchLocationDetailsComponent } from './fetchlocation-details/fetchlocation-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FetchLocationComponent } from './fetchlocations/fetchlocation.component';
import { LocationService } from './services/locationservice.service';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { LogoutComponent} from './logout/logout.component';
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
    AddCarpentryServiceTypeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomepageComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'carpentry-services', component: CarpentryServiceComponent },
      { path: 'add-carpentry-service', component: AddCarpentryServiceComponent },
      { path: 'add-carpentry-service-type', component: AddCarpentryServiceTypeComponent },
      { path: 'fabrics', component: FabricComponent },
      { path: 'contact-us', component: ContactUsComponent },

      { path: 'registration', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      // { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent }

    ])
  ],
  providers: [LocationService, CarpentryServiceService,
      CarpentryServiceTypeService, FabricService, FabricTypeService,
      ReferencePictureService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
