import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getClientMessage(error: Error): string{
    if(!navigator.onLine){
      return ('No network available');
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string|undefined {
    return error.stack;
  }

  getServerMessage(error: HttpErrorResponse): string{
    return error.message;
  }

  getServerStatus(error: HttpErrorResponse): number{
    return error.status;
  }
}
