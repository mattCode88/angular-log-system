import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/classes/user';
import ValidatoreForm from 'src/app/validators/validatoreForm';
import RegError from 'src/app/classes/regerror';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css']
})
export class AuthRegisterComponent implements OnInit {

  registerForm: FormGroup;
  erroreDiRegistrazione = new RegError();

  constructor(readonly builder: FormBuilder, readonly authServices: AuthService, readonly router: Router) {

    this.registerForm = builder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, ValidatoreForm.validaMail()])],
      password: ['', Validators.compose([Validators.required, ValidatoreForm.passworValidator()])]
    })

  }

  verificaForm(): void {
    this.erroreDiRegistrazione.status = false;
    this.erroreDiRegistrazione.message = '';
    if (!this.registerForm.valid) return;
    this.regSubmit();
  }

  regSubmit(): void {
    this.authServices.getUsers().subscribe(res => {
      let newId = (res.length + 1).toString();
      if (!this.verifyUser(this.registerForm.value.username, this.registerForm.value.email, res)) {
        let newUser = this.authServices.createUser(this.registerForm.value, newId);
        this.authServices.saveUser(newUser).subscribe(() => this.router.navigateByUrl('/login'));
      } else {
        this.erroreDiRegistrazione.status = true;
        this.erroreDiRegistrazione.message = 'Email o Username già registrati.';
      }
    })
  }

  verifyUser(name: string, email: string, users: User[]): boolean {
    let control = false;
    users.forEach(utente => {
      if (utente.username === name || utente.email === email) control = true;
    })
    return control;
  }

  ngOnInit(): void {
  }

}
