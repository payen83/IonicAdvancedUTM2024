import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent  implements OnInit {
  @Input() alertMessage: string = '';
  alertButtons: Array<any> = ['OK'];
  @Input() openAlert: boolean = false;
  @Output() getAlertStatusChanged = new EventEmitter<boolean>();
  constructor() { }

  setOpen(open: any){
    this.openAlert = open;
    this.getAlertStatusChanged.emit(open);  
  }

  ngOnInit() {}

}
