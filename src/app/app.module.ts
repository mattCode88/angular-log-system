import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AuthModule } from './modules/auth/auth.module';
import { AuthLoginComponent } from './views/auth-login/auth-login.component';
import { AuthRegisterComponent } from './views/auth-register/auth-register.component';
import { HomeComponent } from './views/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
