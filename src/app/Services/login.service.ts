import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import {AutodeskUser} from '../Models/User.Model'
import {HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:AutodeskUser=new AutodeskUser();
  readonly apiURL="http://localhost:53307/api/AutodeskUser"
  //readonly apiURL="http://autodesk.api.com/api/Autodeskuser";

  constructor(private http:HttpClient) { }

  AddUser(user:AutodeskUser):Observable<AutodeskUser>{
    return this.http.post<AutodeskUser>(this.apiURL,user).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  VerifyUsername(name:string):Observable<boolean>{
    const headers= new HttpHeaders({
      'username':name,
      'task':'verifyUsername'
    });
    return this.http.get<boolean>(this.apiURL,{headers:headers}).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  GeUser(name:string,pwt:string):Observable<boolean>{
    const headers= new HttpHeaders({
      'username':name,
      'password':pwt
    });
    return this.http.get<boolean>(this.apiURL,{headers:headers}).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error:HttpErrorResponse){
    console.log("Error Occured",error);
    return throwError(error);
  }
}



