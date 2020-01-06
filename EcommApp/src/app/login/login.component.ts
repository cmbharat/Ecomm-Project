import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {



  form = new FormGroup({
    emailId: new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
    password: new FormControl('')
  });

  constructor(private router:Router) { }

  get emailId() {
    return this.form.get('emailId');
  }
  get password() {
    return this.form.get('password');
  }
  login() {

    console.log("inside login form");
    this.router.navigateByUrl('register');
  }


}
