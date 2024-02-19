import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  file_ext: string = '';
  file_view:  string = '';
  
  constructor() { }

  ngOnInit() {
  }

  onFileChanged(fileChangeEvent: any){

  }

  uploadSingleFile(){
    
  }

}
