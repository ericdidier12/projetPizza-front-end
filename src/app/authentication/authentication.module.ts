import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';


const appRoutes : Routes = [
  { path: 'login', component: LoginComponent,},
  { path: 'inscription', component: InscriptionComponent}
  ];


@NgModule({
  declarations: [
    LoginComponent,
    InscriptionComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
