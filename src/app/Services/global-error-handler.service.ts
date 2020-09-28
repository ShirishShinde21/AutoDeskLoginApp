import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor() { }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
        console.error('Backend returned status code: ', error.status);
        console.error('Response body:', error.message);      	  
    } else {
        console.error('An error occurred:', error.message);
    }     
  }
}
