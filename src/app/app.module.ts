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


import { AuthServiceService } from './services/AuthService.service';
import { AuthInterceptorService } from './services/AuthInterceptor.service';
import { PizzaModule } from './pizza/pizza.module';
import { AuthenticationModule } from './authentication/authentication.module';


const appRoutes : Routes = [
    {path: 'home', component :WelcomeComponent},
    {path: '', component :WelcomeComponent},
    { path: 'not-found', component: FourOhFourComponent },
    { path: 'not-found', component: FourOhFourComponent },
    { path: '**', redirectTo: '/not-found' }
    ];


@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      WelcomeComponent,
      FourOhFourComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      HttpModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      PizzaModule,
      AuthenticationModule
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
