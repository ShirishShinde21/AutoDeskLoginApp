import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setWithExpiry(key, value) {
    const now = new Date()
    now.setMinutes( now.getMinutes() + 20 );
    const item = {
      value: value,
      expiry: now.getTime(),
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  removeKey(key){
    localStorage.removeItem(key);
  }

  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

}
