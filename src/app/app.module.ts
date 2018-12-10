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
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { PizzaModule } from './pizza/pizza.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PizzaResolverService } from './services/PizzaResolver.service';



const appRoutes : Routes = [
    {path: 'home', component :WelcomeComponent},
    {path: '', component :WelcomeComponent},
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
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      PizzaModule,
      AuthenticationModule
   ],
   providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    PizzaResolverService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
