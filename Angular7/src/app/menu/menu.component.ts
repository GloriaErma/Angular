import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  Home: boolean = false;
  Contact: boolean = false;

  usuarioLogueado = false;

  constructor(public router: Router,
              public authService: AuthService) { }

  ngOnInit() {
    if (this.router.url ===  '/contact'){
      this.Contact= true;}
    if (this.router.url ===  '/'){
      this.Home= true;}

    console.log("la ruta ACTUAL es: ", this.router.url); //  /tu-ruta
    console.log("Home: ", this.Home); //  /tu-ruta
    console.log("Contact: ", this.Contact); //  /tu-ruta

    this.usuarioLogueado = this.authService.isloggedIn('');
    this.authService.changeLoginStatus$.subscribe((loggedStatus: boolean)=> {
      this.usuarioLogueado = loggedStatus;
    })
  }

  logout(){
    this.authService.logout();
  }

}
