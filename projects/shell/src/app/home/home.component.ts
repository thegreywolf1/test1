import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  userName: string = '';

  props = {
    "message": "Hello from Shell"
  }

  events = {
    "clicked": (event) => {
      console.debug('clicked!', event);
    }
  }

  options: WebComponentWrapperOptions = {
    remoteEntry: 'https://nice-grass-018f7d910.azurestaticapps.net/remoteEntry.js',
    remoteName: 'angular1',
    exposedModule: './web-components',
    elementName: 'angular1-element'
  }

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  login() {
  }

}
