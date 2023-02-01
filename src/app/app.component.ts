import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Contact List';
  links = [
    { path: '/home', icon: 'home', title: 'Home' },
    { path: '/contacts', icon: 'fingerprint', title: 'Directory'},
  ]
}