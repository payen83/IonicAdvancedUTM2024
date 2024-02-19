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
  files_view: string = '';
  filename: string = '';
  file!: File;
  files_ext: string[] = [];
  fileCount: number = 0;
  fileList: File[] = [];
  filesname: string[] = [];
  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  onFilesChanged(filesChangeEvent: any){
    this.filesname = [];
    this.files_ext = [];
    this.fileList = [];
    this.fileCount = 0;
    let types = [];

    for (let i=0; i < filesChangeEvent.target.files.length; i++){
      this.fileList.push(filesChangeEvent.target.files[i]);
      this.filesname.push(filesChangeEvent.target.files[i].name);
      types.push(filesChangeEvent.target.files[i].type);
    }

    this.filesname.map((file: any) => {
      this.fileCount += 1;
      this.files_ext.push(file.slice((file.lastIndexOf(".")-1>>>0)+2));
    })

    const positions = types[0].search("image");

    if(positions >=0){
      const reader = new FileReader();
      reader.readAsDataURL(this.fileList[0]);
      reader.onload = (event: any) => {
        this.files_view = event.target.result;
      };
      reader.onerror = (error) => {
        console.log('Error', error);
      };
    } else {
      this.files_view = '';
    }

  }
  
  async uploadMultiFile(){
    if(this.fileList.length > 0){
      let success = 0;
      let failed = 0;

      for (let _file of this.fileList){
        let formData = new FormData();
        formData.append('upfile', _file);
        await this.api.httpPost('/upload', formData)
        .then((response: any)=>{
          success++
        }).catch((error: any)=>{
          failed++;
          console.log('Error while uploading file', error);
        })
      }
      //show success alert
      if(success > 0 && failed == 0){
        alert('All files uploaded successfully');
      } else {
        alert('Some file failed to upload');
      }
    }
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
