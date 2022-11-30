import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrls: ['./usuarios-listado.component.css']
})
export class UsuariosListadoComponent implements OnInit {
  usuarios!: Usuario[];
  loading = this.hideSpin();

  constructor(private router: Router,
              private spinner: NgxSpinnerService,
              private Wservice: UserService) { }

  ngOnInit(): void {
    this.listaUsuarios();
  }

  listaUsuarios(){
    this.loading = this.showSpin();
    this.Wservice.obtenerUsuarios().subscribe((data: Usuario[])=> {
      this.usuarios=data,
      this.loading = this.hideSpin()},
      ( error: any) =>{ console.error(error),
        this.loading = this.hideSpin();}
      );
  }
  showSpin() {
    this.spinner.show();
  }
  hideSpin() {
    this.spinner.hide();
  }
  verPosts(idUsuario:number){
    this.loading = this.showSpin();
    this.router.navigate(["/usuarios", idUsuario, 'posts']);
  }

}
