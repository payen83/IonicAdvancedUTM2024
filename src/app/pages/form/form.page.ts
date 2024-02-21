import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  public staff: any = {name: '', gender: ''};
  public staffList: Array<any> = [];
  myMessage: string = '';
  isAlertOpen: boolean = false;
  weight: number = 89;
  unit: string = 'kg';
  constructor(private network: NetworkService) { }

  async ngOnInit() {
    const data = await this.network.loadDataFromStorage('STAFF');
    console.log('response: ',data);
    if(data){
      this.staffList = JSON.parse(data);
    }
  }

  closeAlert(status: boolean){
    this.isAlertOpen = status;
  }

  async submitForm(){
    const network = await this.network.checkNetworkStatus();
    this.staffList.push(this.staff);
    this.sendMessage('Form Submitted!!');
    if(!network.connected){
      //network not available
      this.network.saveDataToStorage('STAFF', JSON.stringify(this.staffList));
      this.network.presentToast('Network not available, saving to local storage');
    } else {
      //network available
      //call api
    }
  }

  sendMessage(message: any){
    this.myMessage = message;
    this.isAlertOpen = true;
  }

}
