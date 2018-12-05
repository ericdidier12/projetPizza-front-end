import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public connecterUser:User = null;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authService.connectedUser.subscribe(
      user=> this.connecterUser = user,
      err=>this.connecterUser = null
    );
  }
  
  logout():void{
    this.authService.logout();
  }
}
