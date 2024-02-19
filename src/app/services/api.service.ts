import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = 'https://9670-161-139-31-248.ngrok-free.app/api'
  constructor() { }

  httpPost(path: string, data: any){
    let fullUrl: string = this.baseURL + path;
    return new Promise((resolve, reject) => {
      fetch(fullUrl, {
        method: 'POST',
        body: data
      }).then((res: any)=>{
        console.log('response: ', res);
        resolve(res);
      }).catch((error: any) => {
        reject(error);
      });
    })
  }




}
