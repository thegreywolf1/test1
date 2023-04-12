import { loadRemoteEntry } from '@angular-architects/module-federation';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


// if (environment.production) {
//   enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule)
// .catch(err => console.error('Error loading remote entries', err))
// .catch(err => console.error(err));

Promise.all([
   // loadRemoteEntry({ type: 'module', remoteEntry: 'http://localhost:3000/remoteEntry.js'})
   loadRemoteEntry({ type: 'module', remoteEntry: 'https://brave-glacier-0ffc18c10.azurestaticapps.net/remoteEntry.js'})
])
.catch(err => console.error('Error loading remote entries', err))
.then(() => import('./bootstrap'))
.catch(err => console.error(err));
