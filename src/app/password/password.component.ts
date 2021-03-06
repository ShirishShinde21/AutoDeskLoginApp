import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router,ActivatedRoute, ParamMap} from '@angular/router';
import {LoginService} from '../Services/login.service';
import {LocalstorageService} from '../Services/localstorage.service';
import { WhiteSpaceValidator } from '../CustomValidations/whitespace.validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html'
})
export class PasswordComponent implements OnInit {
  
  username:string;
  invalidCredentials:boolean=false;
  technicalIssue:boolean=false;

  get password(){
    return this.passwordForm.get('password');
  }

  constructor(private router:Router, private route:ActivatedRoute, private fb: FormBuilder,private loginService:LoginService, private local:LocalstorageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      let user= param.get('username');
      this.username = user.toString();
      console.log('Username', this.username);
    });

    if(this.username.trim().length===0 || this.username ==null){
      this.router.navigate(["/login"]);
    }
  }

  passwordForm = this.fb.group({
    password:['',[Validators.required,WhiteSpaceValidator]]
  });

  SignIn(){
    this.loginService.GeUser(this.username,this.password.value).subscribe(response=>{
      if(response){
        this.invalidCredentials=false;
        this.local.removeKey('username');
        this.local.setWithExpiry('username',this.username);
        this.router.navigate(['dashboard'])
      }
      else{
        this.invalidCredentials=true;
      }
    },
    (error)=>{
      this.technicalIssue=true;
      console.log("Error occured",error);
    });
  }
}


