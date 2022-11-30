import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/Login/login.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/Login/token.service';
import { InfoToken } from 'src/app/classes/InfoToken';
import { GeneralResponse } from 'src/app/classes/GeneralResponse';
import { ConfirmaLoginResponse } from 'src/app/classes/ConfirmaLoginResponse';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-politicas-condiciones',
  templateUrl: './politicas-condiciones.component.html',
  styleUrls: ['./politicas-condiciones.component.css']
})
export class PoliticasCondicionesComponent implements OnInit {
  // tslint:disable: typedef
  get fc() { return this.checkForm.controls; }
  get fp() { return this.passForm.controls; }
  public tituloModulo: string | undefined;
  public nomUsuario: string | undefined;
  public terminosVisibles = true;
  public esCrearUsuario = false;
  public esConfirmarUsuario = false;
  public checkSubmitted = false;
  public passSubmitted = false;
  public passNoCoinciden = false;
  public mensajeError = '';
  public errorConfirmacion = false;
  public checkForm!: FormGroup;
  public passForm!: FormGroup;
  constructor(private confirmaService: LoginService,
              private tokenService: TokenService,
              private router: Router,
              private storageService: StorageService) { }

  public ngOnInit(): void {
    if (sessionStorage.getItem('PrimerIngresoPoliticas') === undefined) {
      this.router.navigate(['/Login']);
    }
    else {
      if (sessionStorage.getItem('PrimerIngresoPoliticas') === 'N'){
        this.tituloModulo = 'Crear cuenta';
      }
      else{
        this.tituloModulo = 'Inicio por primera vez';
      }
    }

    this.checkForm = new FormGroup({
      chkAceptacion: new FormControl(false, Validators.requiredTrue)
    });
    this.passForm = new FormGroup({
      pass: new FormControl('', Validators.required),
      confirmPass: new FormControl('', [Validators.required])
    }
    );
  }

  public checkAceptarTerminos(){
    this.checkSubmitted = true;
    if (!this.checkForm.invalid) {
      this.terminosVisibles = false;
      if (sessionStorage.getItem('PrimerIngresoPoliticas') === 'S'){
        this.esConfirmarUsuario = true;
        window.scrollTo(0, 0);
      }
      else{
        sessionStorage.setItem('AutorizaPoliticas', 'S');
        this.router.navigate(['/SolicitudUsuarioNuevo']);
      }
    }

  }

  public checkPassword(){
    this.passNoCoinciden = false;
    this.passSubmitted = true;
    if (!this.passForm.invalid) {
      if (this.passForm.get('pass')!.value !== this.passForm.get('confirmPass')!.value)
      {
        this.passNoCoinciden = true;
      }
      else{
        this.ConfirmarLogin();
      }
    }
  }

  public Volver(){
    this.router.navigate(['/Login']);
  }

  private ConfirmarLogin(){
    let respServicio: ConfirmaLoginResponse;
    const nomUsuario = sessionStorage.getItem('nomUsuario') ;
    const passUsuario = this.passForm.get('pass')!.value;
    this.confirmaService.ConfirmarInicioSesion(nomUsuario!, passUsuario).subscribe((data: ConfirmaLoginResponse) => {
      respServicio = data;
      if (respServicio.respuesta.substring(0, 2) === 'OK'){
        this.mensajeError = '';
        this.errorConfirmacion = false;
        sessionStorage.removeItem('passUsuario');
        sessionStorage.setItem('passUsuario', passUsuario);
        this.ObtenerToken();
      } else {
        this.errorConfirmacion = true;
        this.mensajeError = respServicio.respuesta;
      }
    },
    (err: GeneralResponse) => {
      this.errorConfirmacion = true;
      this.mensajeError = err.mensaje;
    });
  }

  private ObtenerToken(){
    this.tokenService.ObtenerToken().subscribe(
      (data: GeneralResponse) => {
        this.storageService.setCurrentSession(data.respuesta);
        this.router.navigate(['/dashboard']);
      });
  }
}
