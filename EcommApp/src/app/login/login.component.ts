import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  loginResponse;

  form = new FormGroup({
    emailId: new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
    password: new FormControl('')
  });

  constructor(private router:Router,private userService:UserService) { }

  get emailId() {
    return this.form.get('emailId');
  }
  get password() {
    return this.form.get('password');
  }
  login() {
    console.log(this.form.value);
    console.log("inside login form");
    this.userService.authenticate(this.form.value).subscribe(
      response => {
         this.loginResponse= response;
         
           console.log("login success");
           localStorage.setItem('token',this.loginResponse.token);
           this.router.navigateByUrl('main');
           this.form.reset();         
      },
      error => {
        console.log(error);
      }
    )
  }




}
