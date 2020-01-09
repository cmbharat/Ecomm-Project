import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseurl = "http://localhost:3019/";
  constructor(private httpClient: HttpClient) { }


  registerUser(user) {
    return this.httpClient.post(this.baseurl + "register", user);
  }

  authenticate(user) {
    return this.httpClient.post(this.baseurl + "login", user);
  }
}
