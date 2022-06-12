import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import LogError from 'src/app/classes/logError';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  loginrForm: FormGroup;
  erroreDiLogin = new LogError()

  constructor(readonly builder: FormBuilder, readonly authServices: AuthService, readonly router: Router) {

    if (this.authServices.isLogged()) this.router.navigate(['/home']);

    this.loginrForm = builder.group({
      username: [''],
      password: ['']
    })
  }

  loginSubmit(): void {
    this.erroreDiLogin.status = false;
    this.authServices.getUser(this.loginrForm.value.username).subscribe(res => {
      if (res.length === 0) {
        this.erroreDiLogin.status = true;
        this.erroreDiLogin.message = 'Username errato!';
        return;
      }
      if (res[0].password === this.loginrForm.value.password) {
        this.authServices.login(res[0].username);
        this.router.navigate(['/home'])
      } else {
        this.erroreDiLogin.status = true;
        this.erroreDiLogin.message = 'Password errata!';
      }
    })
  }

  ngOnInit(): void {
  }

}
