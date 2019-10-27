import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

export function getBaseUrl() {
   return document.getElementsByTagName('base')[0].href;
   return location.href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];
/*
if (environment.production) {
  enableProdMode();
}*/

platformBrowserDynamic(providers).bootstrapModule(AppModule)
.catch(err => console.log(err));
