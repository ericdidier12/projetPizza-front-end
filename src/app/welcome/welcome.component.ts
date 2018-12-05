import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.whoAmITest()
                    .subscribe( res => this.user = res);
  }

}
