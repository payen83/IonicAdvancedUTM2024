import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  listener: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  public ngAfterViewInit(){
    setTimeout(() => {
      this.startScan().then((result: any) => {
        this.modalCtrl.dismiss(result);
      })
    }, 250)
  }
  startScan(){
    return new Promise(async resolve => {
      document.querySelector('body')?.classList.add('barcode-scanner-active');
      this.listener = await BarcodeScanner.addListener(
        'barcodeScanned',
        async result => {
          this.stopScan();
          resolve(result);
        }
      );
      await BarcodeScanner.startScan();
    })
  }

  async stopScan(){
    await this.listener.remove();
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    await BarcodeScanner.stopScan();
  }

  toggleTorch(){

  }

  closeModal(){
    this.stopScan();
    this.modalCtrl.dismiss();
  }

}
