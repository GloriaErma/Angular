import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-post',
  templateUrl: './menu-post.component.html',
  styleUrls: ['./menu-post.component.css']
})
export class MenuPostComponent implements OnInit {
  usuarioLogueado = false;
  isPost = true;

  constructor(public router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
    console.log("la ruta ACTUAL es: ", this.router.url); //  /tu-ruta

    this.usuarioLogueado = this.authService.isloggedIn('');
    this.authService.changeLoginStatus$.subscribe((loggedStatus: boolean)=> {
      this.usuarioLogueado = loggedStatus;
    })
  }

  logout(){
    this.authService.logout();
  }

}
