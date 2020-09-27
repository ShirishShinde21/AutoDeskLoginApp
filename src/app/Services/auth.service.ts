import { Injectable } from '@angular/core';
import {LocalstorageService} from './localstorage.service'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorage:LocalstorageService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('username');
    return token==null? false:true;
  }
}
