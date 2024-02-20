import { ErrorHandler, Injectable } from "@angular/core";
import { ErrorService } from "./error.service";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private errorService: ErrorService){}

    handleError(error: Error | HttpErrorResponse) {
        let message;
        let status;
        let stackTrace;

        if(error instanceof HttpErrorResponse){
            message = this.errorService.getServerMessage(error);
            status = this.errorService.getServerStatus(error);
            console.error('Message from Http Error: ', message, status);
        } else {
            message = this.errorService.getClientMessage(error);
            stackTrace = this.errorService.getClientStack(error);
            console.error('Message from Global Error: ', message, stackTrace);
        }
    }

}