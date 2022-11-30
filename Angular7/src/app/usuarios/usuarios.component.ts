import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios!: Usuario[];

  constructor(private router: Router,
              private Wservice: UserService) { }

  ngOnInit(): void {
    // this.Wservice.obtenerUsuarios().subscribe((data: Usuario[])=> this.usuarios=data,
    //               ( error: any) => console.error(error)
    //               );
  }
  // verPosts(idUsuario:number){
  //   this.router.navigate(["/usuarios", idUsuario, 'posts']);
  // }
}
