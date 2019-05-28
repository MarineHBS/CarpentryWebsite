import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarpentryServiceComponent } from './carpentry-service/carpentry-service.component';
import { AddCarpentryServiceComponent } from './add-carpentry-service/add-carpentry-service.component';
import { AddCarpentryServiceTypeComponent } from './add-carpentry-service-type/add-carpentry-service-type.component';
import { FabricComponent } from './fabric/fabric.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { AddReferencePictureComponent } from './add-reference-picture/add-reference-picture.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactComponent } from './contact/contact.component';
import { AddFabricComponent } from './add-fabric/add-fabric.component';
import { AddFabricTypeComponent } from './add-fabric-type/add-fabric-type.component';
import { AdminAreaComponent } from './admin-area/admin-area.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'carpentry-services', component: CarpentryServiceComponent },
  { path: 'add-carpentry-service', component: AddCarpentryServiceComponent },
  { path: 'carpentry-service/edit/:id', component: AddCarpentryServiceComponent },
  { path: 'add-carpentry-service-type', component: AddCarpentryServiceTypeComponent },
  { path: 'carpentry-service-type/edit/:id', component: AddCarpentryServiceTypeComponent },
  { path: 'add-fabric', component: AddFabricComponent },
  { path: 'fabric/edit/:id', component: AddFabricComponent },
  { path: 'add-fabric-type', component: AddFabricTypeComponent },
  { path: 'fabric-type/edit/:id', component: AddFabricTypeComponent },
  { path: 'add-rating', component: AddRatingComponent },
  { path: 'add-reference-picture', component: AddReferencePictureComponent },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'contact/edit/:id', component: AddContactComponent },
  { path: 'fabrics', component: FabricComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'chat', component: ChatroomComponent },

  { path: 'admin-area', component: AdminAreaComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
];
