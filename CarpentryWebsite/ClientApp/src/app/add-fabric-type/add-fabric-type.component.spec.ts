import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFabricTypeComponent } from './add-fabric-type.component';
import { AppModule } from '../app.module';
import { FabricTypeService } from '../services/fabric-type.service';
import { FormBuilder } from '@angular/forms';
import { getBaseUrl } from '../../main';

describe('AddFabricTypeComponent', () => {
  let component: AddFabricTypeComponent;
  let fixture: ComponentFixture<AddFabricTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ ],
      providers: [FabricTypeService, FormBuilder, { provide: 'BASE_URL', useFactory: getBaseUrl}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFabricTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
