import {Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PasswordValidator} from '../CustomValidations/password.validator';
import {UsernameValidator} from '../CustomValidations/username.validator';
import {LoginService} from '../Services/login.service';
import {NotificationService} from '../Services/notification.service';
import {WhiteSpaceValidator} from '../CustomValidations/whitespace.validator';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent{
  
  usernameAlreadyExists:boolean=false;
  technicalIssue:boolean=false;

  get firstName(){
    return this.registrationForm.get('firstName');
  }
  get lastName(){
    return this.registrationForm.get('lastName');
  }
  get username(){
    return this.registrationForm.get('username');
  }
  get confirmUsername(){
    return this.registrationForm.get('confirmUsername');
  }
  get password(){
    return this.registrationForm.get('password');
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }

  constructor(private fb:FormBuilder,private router:Router,private loginService:LoginService,private notificationService:NotificationService) { }

  registrationForm= this.fb.group(
  {
    firstName:['',[Validators.required,WhiteSpaceValidator]],
    lastName:['',[Validators.required,WhiteSpaceValidator]],
    username:['',[Validators.required,WhiteSpaceValidator]],
    confirmUsername:['',[Validators.required,WhiteSpaceValidator]],
    password:['',[Validators.required,Validators.minLength(6),WhiteSpaceValidator]],
    confirmPassword:['',[Validators.required,WhiteSpaceValidator]]
  },
  {
    validator: [PasswordValidator,UsernameValidator]
  });

  RegisterUser(){
    this.MapUserfields();
    this.loginService.AddUser(this.loginService.user).subscribe(result=>{  
      if( result.username==this.username.value){
        this.notificationService.showSuccess("Account created successfully","Autodesk");
        this.router.navigate(['/login']);
      }
      else{
        this.usernameAlreadyExists=true;
        this.notificationService.showError("Username already exists","Autodesk");
      } 
    },
    error=>{
      console.log("Error Occured");
      if(error instanceof HttpErrorResponse){
        this.technicalIssue=true;
      }
    });
  }

  MapUserfields()
  {
    this.loginService.user.firstName=this.firstName.value;
    this.loginService.user.lastname=this.lastName.value;
    this.loginService.user.username=this.username.value;
    this.loginService.user.userPassword=this.password.value;
  }
}
