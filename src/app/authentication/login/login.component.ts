import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode:number = 0 ;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.connectedUser.subscribe(
      user => {
        if (user != null) {
          this.router.navigate([''])
        }
      });
  }

  public onLogin(loginForm: NgForm):void {
    if(loginForm.valid) {
      this.authService.login(loginForm.value).subscribe(
        res => {
          this.router.navigate(['']);
        },
        err=>{
           this.mode = 1;
        });
    }
  }

}
