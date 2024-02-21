import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public alertButtons: Array<any>;
  public openAlert: boolean = false;
  constructor(public router: Router) { 
    this.alertButtons = [
      { text: 'No', role: 'cancel', handler: () => { this.closeAlert('NO'); } },
      { text: 'Yes', role: 'confirm', handler: () => { this.closeAlert('YES'); } }
    ]
  }

  closeAlert(text: string){
    console.log('Selected '+ text);
    this.openAlert = false;
  }
  
  ngOnInit() {
  }

  presentAlert(isOpen: boolean){
    this.openAlert = isOpen;
  }

  navigateTo(path: string){
    this.router.navigateByUrl('/folder/' + path);
  }

}
