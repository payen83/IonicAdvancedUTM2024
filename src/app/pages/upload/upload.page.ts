import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  file_ext: string = '';
  file_view:  string = '';
  filename: string = '';
  file!: File;

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  onFileChanged(fileChangeEvent: any){
    this.file = fileChangeEvent.target.files[0];
    this.filename = this.file.name;
    const type = this.file.type;

    //get file extension
    const ext = this.filename.slice((this.filename.lastIndexOf(".") -1 >>> 0)+2);
    console.log("file extension: ", ext);
    const position = type.search('image');

    //check if upload file is image
    if(position >= 0){
      const reader = new FileReader();
      this.file_ext = '';
      reader.readAsDataURL(this.file);
      reader.onload = (event: any) => {
        this.file_view = event.target.result;
        // console.log(this.file_view);
      };
      reader.onerror = (error: any) => {
        console.log('Error occured: ', error);
      };
    } else {
      this.file_ext = ext;
    }
  }

  uploadSingleFile(){
    if(this.file){
      let formData = new FormData();
      formData.append('upfile', this.file, this.filename);
      this.api.httpPost('/upload', formData)
      .then((response: any) => {
        alert('File uploaded successfully');
      })
      .catch((err: any) => {
        alert('Error: '+ JSON.stringify(err));
      })
    }
  }
  

}
