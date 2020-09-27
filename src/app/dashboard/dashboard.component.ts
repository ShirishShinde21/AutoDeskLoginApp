import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {LocalstorageService} from '../Services/localstorage.service';
import {NotificationService} from '../Services/notification.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private router:Router,private local:LocalstorageService,private notificationService:NotificationService) { }

  ngOnInit(): void {

  }

  Logout(){
    this.local.removeKey('username');
    this.notificationService.showSuccess("Logged out successfully","Autodesk");
    this.router.navigate(['login']);
  }
}
