import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import {Router,ActivatedRoute} from '@angular/router'
import {LoginService} from '../Services/login.service'
import {WhiteSpaceValidator} from '../CustomValidations/whitespace.validator'

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

  constructor(private fb:FormBuilder,private router:Router,private loginService:LoginService) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    username:['',[Validators.required,WhiteSpaceValidator]]

  });

  ValidateUsername(){

    //this.loginService.username = this.username.value;
    this.loginService.VerifyUsername(this.username.value).subscribe(response=>{
      if(response){
        this.validUsername=true;
        this.router.navigate(['password',{username:this.loginForm.get('username').value}]);
      }
      else{
        this.validUsername=false;
      }
    },(error)=>{
      console.log("Error occured",error);
    });
    
    
  }

}
