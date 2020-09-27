import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router,ActivatedRoute, ParamMap} from '@angular/router';
import {LoginService} from '../Services/login.service';
import {LocalstorageService} from '../Services/localstorage.service';
import { WhiteSpaceValidator } from '../CustomValidations/whitespace.validator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public username;
  public invalidCredentials=false;
  get password(){
    return this.passwordForm.get('password');
  }

  constructor(private router:Router, private route:ActivatedRoute, private fb: FormBuilder,private loginService:LoginService, private local:LocalstorageService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param:ParamMap)=>{
      let user= param.get('username');
      this.username = user.toString();
      console.log('Username', this.username);
    });

    if(this.username =="" || this.username ==null){
      this.router.navigate(["/login"]);
    }


  }

  passwordForm = this.fb.group({
    password:['',[Validators.required,WhiteSpaceValidator]]

  });

  SignIn(){
    this.spinner.show();
    this.loginService.password=this.password.value;
    this.loginService.username= this.username;
    this.loginService.GeUser(this.username,this.password.value).subscribe(response=>{
      if(response){
        this.invalidCredentials=false;
        this.local.removeKey('username');
        this.local.setWithExpiry('username',this.username);
        this.spinner.hide();
        this.router.navigate(['dashboard'])
      }
      else{
        this.invalidCredentials=true;
        this.spinner.hide();
      }
    },(error)=>{
      this.spinner.hide();
    });
   /* this.loginService.GetUser().subscribe(response=>{
      
      if(response.userPassword == this.loginService.password){
        this.invalidCredentials=false;
        this.local.removeKey('username');
        this.local.setWithExpiry('username',response.username);
        this.router.navigate(['dashboard'])
      }

      else{
        this.invalidCredentials=true;
      }
    
    });
    */
  }

 
}


