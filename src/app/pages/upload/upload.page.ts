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
  fileList: any = [];
  filesname: string[] = [];
  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  deleteItem(i: number){
    return this.fileList.splice(i, 1);
  }

  async onFilesChanged(filesChangeEvent: any){
    for(let file_ of filesChangeEvent.target.files){
      console.log(file_);
      let ext_ = file_.name.slice((file_.name.lastIndexOf('.') -1 >>> 0) + 2);
      let type_ = file_.type;
      let view_: any = '';
      let size: number = file_.size;
      const allowedSize = 1024000;
      if(file_.size>allowedSize){
        alert('image ' + file_.name +' is more than 1MB');
        continue;
      }
      console.log(ext_);
      const positions = type_.search("image");
      // if(ext_ != 'png' && ext_ != 'jpg'){
      //   alert('image format for '+ file_.name + ' is not allowed');
      //   continue;
      // }
      if(positions >=0){
        //Option 1
        try {
          view_ = await this.getImageData(file_);
          this.fileList.push({file: file_,filename: file_.name,type: type_,file_ext: ext_,file_view: view_});
        } catch(error) {
          console.log(error);
        }
        // Option 2
        // this.getImageData(file_).then((result: any)=>{
        //   view_ = result;
        //   console.log('view retreived');
        //   this.fileList.push({file: file_,filename: file_.name,type: type_,file_ext: ext_,file_view: view_});
        // }).catch((err: any)=>{
        //   console.log(err);
        // })
      } else {
        alert('image format for '+ file_.name + ' is not allowed');
    }  
    } // end of for loop
    console.log(this.fileList);
  }

  getImageData(file_: any){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file_);
      reader.onload = (event: any) => {
        let view_ = event.target.result;
        resolve(view_);
      };
      reader.onerror = (error) => {
        console.log('Error', error);
        reject(error);
      };
    });
  }

  onFilesChanged_old(filesChangeEvent: any){
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
        formData.append('upfile', _file.file);
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
