import { Component } from '@angular/core';
import { NetworkService } from './services/network.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Geolocation', url: '/geolocation', icon: 'navigate' },
    { title: 'Notification', url: '/local-notification', icon: 'alert-circle' },
    { title: 'Upload Files', url: '/upload', icon: 'cloud-upload' },
    { title: 'QR Scanner', url: '/qr', icon: 'barcode' },
    { title: 'Async Await', url: '/async', icon: 'timer' },
    { title: 'Forms', url: '/form', icon: 'document-text' },


    // { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = [];
  constructor(private network: NetworkService) {
    this.init();
  }

  init(){
    this.network.beginListenerNetwork();
  }
}
