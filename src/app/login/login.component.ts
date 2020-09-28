import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../Services/login.service';
import {WhiteSpaceValidator} from '../CustomValidations/whitespace.validator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  validUsername:boolean=true;
  technicalIssue:boolean=false;
  
  get username(){
    return this.loginForm.get('username');
  }

  constructor(private fb:FormBuilder,private router:Router,private loginService:LoginService) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    username:['',[Validators.required,WhiteSpaceValidator]]

  });

  ValidateUsername(){
    this.loginService.VerifyUsername(this.username.value).subscribe(response=>{
      this.technicalIssue=false;
      if(response){
        this.validUsername=true;
        this.router.navigate(['password',{username:this.loginForm.get('username').value}]);
      }
      else{
        this.validUsername=false;
      }
    },
    (error)=>{     
      console.log("Error occured",error);
      if(error instanceof HttpErrorResponse){
          this.technicalIssue=true;
      }
    });  
  }
}
