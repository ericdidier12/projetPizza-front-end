import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { LoginComponent } from './login/login.component';

import { AuthServiceService } from './services/AuthService.service';
import { AuthInterceptorService } from './services/AuthInterceptor.service';


const appRoutes : Routes = [
    {path: 'shome', component :WelcomeComponent},
    { path: 'not-found', component: FourOhFourComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/not-found' }
    ];


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      WelcomeComponent,
      FourOhFourComponent,
      LoginComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      HttpModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [ 
                AuthServiceService,
                AuthInterceptorService
             ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
