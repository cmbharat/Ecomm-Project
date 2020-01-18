import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  constructor(private user:UserService, private router:Router) { }

  career;
  ngOnInit() {
    this.user.careers().subscribe(
      res => this.career= res
    ,
    err => { 
      if(err instanceof HttpErrorResponse){
           if(err.status === 401){
                this.router.navigate(['/login']);
           }
    }

})
}


}
