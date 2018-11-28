import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Routes, RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Component } from './.component';
import { FourOhFourComponent } from './FourOhFour/FourOhFour.component';
import { FourOhFour_Component } from './FourOhFour_/FourOhFour_.component';

const appRoutes : Routes = [
    { path: 'home', component: WelcomeComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      WelcomeComponent,
      FourOhFourComponent,
      Component,
      FourOhFour_Component
   ],
   imports: [
      BrowserModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
