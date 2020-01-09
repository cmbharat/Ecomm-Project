import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  reg_response;
  reg_form = new FormGroup({

    username: new FormControl('', [Validators.minLength(4), Validators.maxLength(8), Validators.required]),
  
    mobile: new FormControl('', [
      Validators.pattern('[1-9]{1}[0-9]{9}'),
      Validators.required,
    ]),
    
    emailId: new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
  
    password: new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(8),
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
    ]),
  });

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit() {
  }

  register() {

    console.log("inside register");
    this.userService.registerUser(this.reg_form.value).subscribe(
      (response) => {
         this.reg_response= response;
         if(this.reg_response.status){
           console.log("registration success");
           this.router.navigateByUrl('login');
           this.reg_form.reset();
         }
         else
         {
           console.log("login failed");
           this.reg_form.reset();
         }
         
      }
    )
  }

  get username() {
    return this.reg_form.get('username');
  }
  get mobile() {
    return this.reg_form.get('mobile');
  }
  get emailId() {
    return this.reg_form.get('emailId');
  }
  get password() {
    return this.reg_form.get('password');
  }
}
