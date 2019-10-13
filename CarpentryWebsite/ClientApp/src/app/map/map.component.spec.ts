import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { AppModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../routes';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseUrl } from '../../main';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: 'BASE_URL', useFactory: getBaseUrl }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
