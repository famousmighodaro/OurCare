import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('loginForm')
  form: NgForm;
  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.loginService.login(this.form.value['email'], this.form.value['password'])
  }

}
