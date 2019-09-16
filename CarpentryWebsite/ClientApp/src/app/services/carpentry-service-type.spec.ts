import { TestBed } from '@angular/core/testing';

import { CarpentryServiceTypeService } from './carpentry-service-type.service';
import { AppModule } from '../app.module';
import { getBaseUrl } from '../../main';

fdescribe('CarpentryServiceTypeService', () => {

    let subject: CarpentryServiceTypeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [CarpentryServiceTypeService, { provide: 'BASE_URL', useFactory: getBaseUrl}]
        });
        subject = TestBed.get(CarpentryServiceTypeService);
    });

    fit('should be created', () => {
        expect(subject).toBeTruthy();
    });
    fit('should not work', () => {
        expect(false).toBeTruthy();
    });
});
