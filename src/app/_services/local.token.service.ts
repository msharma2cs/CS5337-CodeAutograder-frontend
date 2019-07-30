import { Injectable } from '@angular/core';

@Injectable()
export class LocalTokenService {

  constructor() { }

  getToken(): string {
    return localStorage.getItem('currentUser');
  }

  saveToken(token: string) {
      localStorage.setItem('currentUser', token);
  }

  destroyToken() {
      localStorage.removeItem('currentUser');
  }

  getUserType(): string {
      return localStorage.getItem('usertype');
  }

  saveUserType(userType: string) {
      localStorage.setItem('usertype', userType);
  }

  destroyUserType() {
      localStorage.removeItem('usertype');
  }

}
