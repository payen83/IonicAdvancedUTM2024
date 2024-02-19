import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  public code: any = null;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async requestPermissions(): Promise<boolean>{
    const {camera} = await BarcodeScanner.requestPermissions();
    return camera == 'granted' || camera == 'limited';
  }

  async openScanner(){
    const granted = await this.requestPermissions();
    if(granted) {
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
        cssClass: 'barcode-scanner-modal',
        showBackdrop: false
      });
      await modal.present();
      const data: any = await modal.onWillDismiss();
      this.code = JSON.stringify(data);
    } else {
      alert('Please enable QR Code Scanner');
    }
  }
}
