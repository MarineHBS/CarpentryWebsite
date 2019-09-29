import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreaComponent } from './admin-area.component';
import { AppModule } from '../app.module';
import { UserService } from '../services/user.service';
import { CarpentryServiceTypeService } from '../services/carpentry-service-type.service';
import { getBaseUrl } from '../../main';

describe('AdminAreaComponent', () => {
  let component: AdminAreaComponent;
  let fixture: ComponentFixture<AdminAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ ],
      providers: [UserService, CarpentryServiceTypeService, { provide: 'BASE_URL', useFactory: getBaseUrl}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
