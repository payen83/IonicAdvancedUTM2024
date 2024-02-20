import { Component, OnInit } from '@angular/core';
import { InputCustomEvent, ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  listener: any;
  enableTorch: boolean = false;
  minZoomRatio: number = 0;
  maxZoomRatio: number = 0;
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
      void BarcodeScanner.getMinZoomRatio().then((result)=>{
        this.minZoomRatio = result.zoomRatio;
      });

      void BarcodeScanner.getMaxZoomRatio().then((result)=>{
        this.maxZoomRatio = result.zoomRatio;
      });
    })
  }

  setZoomRatio(event: InputCustomEvent){
    if(!event.detail.value){
      return;
    }
    BarcodeScanner.setZoomRatio({
      zoomRatio: parseInt(event.detail.value as any, 10)
    });
  }

  async stopScan(){
    await this.listener.remove();
    document.querySelector('body')?.classList.remove('barcode-scanner-active');
    await BarcodeScanner.stopScan();
  }

  async toggleTorch(){
    this.enableTorch = !this.enableTorch;
    await BarcodeScanner.toggleTorch();
  }

  closeModal(){
    this.stopScan();
    this.modalCtrl.dismiss();
  }

}
