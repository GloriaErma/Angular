import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private ruta: Router ) { }

  rutaRedirect = '';

  login(){
    this.authService.login();
    this.rutaRedirect = this.authService.urlUsusarioIntentaAcceder;
    this.authService.urlUsusarioIntentaAcceder = '';
    this.ruta.navigate([this.rutaRedirect]);
  }

  ngOnInit(): void {
  }

}
