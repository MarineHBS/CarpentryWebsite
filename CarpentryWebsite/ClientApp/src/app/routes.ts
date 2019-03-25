import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CarpentryServiceComponent } from './carpentry-service/carpentry-service.component';
import { AddCarpentryServiceComponent } from './add-carpentry-service/add-carpentry-service.component';
import { AddCarpentryServiceTypeComponent } from './add-carpentry-service-type/add-carpentry-service-type.component';
import { FabricComponent } from './fabric/fabric.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'carpentry-services', component: CarpentryServiceComponent },
    { path: 'add-carpentry-service', component: AddCarpentryServiceComponent },
    { path: 'add-carpentry-service-type', component: AddCarpentryServiceTypeComponent },
    { path: 'fabrics', component: FabricComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'chat', component: ChatroomComponent },

    { path: 'registration', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent }
  ];
