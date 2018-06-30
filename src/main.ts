import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if (navigator.serviceWorker) {
  // Let's register our serviceworker
  navigator.serviceWorker
    .register('./sw.js', {
      scope: './'
    })
    .then(registration => {
      console.log('Service worker registered!');
    })
    .catch(error => {
      console.log('Service worker registration failed:', error);
    });
} else {
  console.log('Service workers are not supported.');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
