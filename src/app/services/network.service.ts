import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private toastController: ToastController, private storage: Storage) {
    this.initStorage();
    //this.clearStorage();
  }

  async getAllKeys() {
    return await this.storage.keys();
  }

  async initStorage() {
    await this.storage.create();
  }

  async saveDataToStorage(key: string, value: any) {
    return await this.storage.set(key, value);
  }

  async loadDataFromStorage(key: string) {
    return await this.storage.get(key);
  }

  async clearStorage(key: any) {
    if (key) {
      return await this.storage.remove(key)
    }
    return await this.storage.clear();
  }


  beginListenerNetwork() {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network changed. Status:', status.connected, '. Network type: ', status.connectionType);
      let message: string;
      if (status.connected) {
        message = 'You are back online.';
        this.syncData();
      } else {
        message = 'Network is not available. Data submission will be saved locally.';
      }
      this.presentToast(message);
    })
  }

  async syncData() {
    // const data = await this.loadDataFromStorage('STAFF');
    const keys = await this.getAllKeys();
    console.log('List of forms available: ', keys);

    if (keys.length > 0 && keys) {
      for (let key of keys) {
        if (key == 'STAFF') {
          const data = await this.loadDataFromStorage('STAFF');
          //call api to submit form for staff

          //then clear data
          await this.clearStorage('STAFF');
          // await this.presentToast('Data has been synced to server');
        }

        if (key == 'ROOM') {
          //call api to submit for for booking room

          //then clear data
          await this.clearStorage('ROOM');
          // await this.presentToast('Data has been synced to server');
        }
      }
      await this.presentToast('Data has been synced to server');
    }

    // if(data){
    //   //create function send data to API using http or fetch method

    //   //clear data
    //   await this.clearStorage('STAFF');
    //   await this.presentToast('Data has been synced to server');
    // }
  }

  async presentToast(message_: string) {
    const toast = await this.toastController.create({
      message: message_,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async checkNetworkStatus() {
    return await Network.getStatus();
  }

}
