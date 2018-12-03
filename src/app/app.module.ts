import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Routes, RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';





const appRoutes : Routes = [
    {path: 'home', component :WelcomeComponent},
    { path: 'not-found', component: FourOhFourComponent },
    { path: 'login', component: LoginComponent },
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
      LoginComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
