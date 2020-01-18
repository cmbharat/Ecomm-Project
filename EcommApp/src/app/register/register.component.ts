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
  user={};
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
    console.log(this.reg_form.value);
     
    this.user={
      // "userId":this.userid(4),
      "userName":this.reg_form.value.username,
      "mobile":this.reg_form.value.mobile,
      "emailId":this.reg_form.value.emailId,
      "password":this.reg_form.value.password
    }

    console.log(this.user);
     this.userService.registerUser(this.user).subscribe(
      (res) => {
         this.reg_response= res;
         localStorage.setItem('token',this.reg_response.token);
         
           console.log("registration success");
           this.router.navigateByUrl('login');
           this.reg_form.reset();
         
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

  // userid(length) {
  //   var result = '';
  //   var characters = '0123456789';
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }

  //   var resultInt=parseInt(result);
  //   return resultInt;
  // }
}
