import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = 'https://9670-161-139-31-248.ngrok-free.app/api'
  constructor(public http: HttpClient) { }

  httpGet(url: string){
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        {
          next: (response: any)=>{resolve(response)},
          error: (error: any) => { 
            throwError(()=>'Network error!!')
            reject(error) 
          }
          
        }
      )
    })
  }

  httpGet2(url: string){
    return this.http.get(url)
    .pipe(
      tap((res: any)=> {console.log(res)}),
      catchError((error: any)=>{
        let message: string;
        if(error.error instanceof ErrorEvent){
          message = `Error: ${error.error.message}`
        } else {
          message = error;
        }
        return throwError(()=>message);

      }) 
    )
  }

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
