import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {LoginService} from '../Services/login.service'
import {WhiteSpaceValidator} from '../CustomValidations/whitespace.validator'
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  get username(){
    return this.loginForm.get('username');
  }

  public validUsername=true;
  public technicalIssue=false;

  constructor(private fb:FormBuilder,private router:Router,private loginService:LoginService, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    username:['',[Validators.required,WhiteSpaceValidator]]

  });

  ValidateUsername(){
    debugger;
    this.spinner.show();
    this.loginService.username = this.username.value;
    this.loginService.VerifyUsername(this.username.value).subscribe(response=>{
      this.technicalIssue=false;
      if(response){
        this.spinner.hide();
        this.validUsername=true;
        this.router.navigate(['password',{username:this.loginForm.get('username').value}]);
      }
      else{
        this.spinner.hide();
        this.validUsername=false;
      }
    },(error)=>{
      this.spinner.hide();
      console.log("Error occured",error);
      if(error instanceof HttpErrorResponse){
          this.technicalIssue=true;
      }

    });
    
    
  }

}
