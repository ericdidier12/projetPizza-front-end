import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


const appRoutes : Routes = [
  { path: 'login', component: LoginComponent },
  ];


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    CommonModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
