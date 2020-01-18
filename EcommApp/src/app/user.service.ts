import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseurl = "http://localhost:3019/";
  constructor(private httpClient: HttpClient) { }


  registerUser(user) {
    console.log("inside registeruser"+user);
    return this.httpClient.post(this.baseurl + "register", user);
  }

  authenticate(user) {
    console.log("inside login Authentication "+user.emailId);
    return this.httpClient.post(this.baseurl + "login", user);
  }

  careers(){
    console.log("inside careers");
    return this.httpClient.get(this.baseurl+"career");
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
