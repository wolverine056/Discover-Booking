import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated=true;
  private userId='userid-one';
  get userisauthenticated(){
    return this.authenticated;
  }
  constructor() { }

  get userid(){
    return this.userId
  }
  login(){
    this.authenticated=true;
  }
  logout(){
    this.authenticated=false;
  }
}
