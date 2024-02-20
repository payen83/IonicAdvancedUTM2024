import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-async',
  templateUrl: './async.page.html',
  styleUrls: ['./async.page.scss'],
})
export class AsyncPage implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  async runAsync() {
    // let data1 = await this.getData1();
    // let data2 = await this.getData2();
    // let data3 = await this.getData3();
    // try {
      let final = await Promise.all([this.getData3(), this.getData1()]);
      console.log('Final value combined', final);
    // } catch (error: any) {
    //   console.log(error);
    // }
  }

  getData1() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = 'Get Data 1';
        console.log(data);
        resolve(data);
      }, 1500)
    })
  }

  getData2() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = 'Get Data 2';
        console.log(data);
        resolve(data);
      }, 1000)
    })
  }

  async getData4(){
   return await lastValueFrom(this.api.httpGet2('https://jsnplaceholder.typicode.com/users'));
  }

  async getData3() {
    // return await lastValueFrom(this.api.httpGet('https://jsnplaceholder.typicode.com/users'));
    return new Promise((resolve) => {
      this.api.httpGet('https://jsonplaceholde.typicode.com/users').then((res: any) => {
        console.log(res);
        resolve(res);
      })
      // .catch((error: any) => {
      //   // catchError((error: HttpErrorResponse)=>{
      //   //   return throwError(() => error);
      //   // })
      // });
    })

  }

}
