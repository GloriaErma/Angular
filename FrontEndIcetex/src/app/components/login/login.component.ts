import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/Login/login.service';
import { TokenService } from '../../services/Login/token.service';
import { IpService } from 'src/app/services/helpers/ip.service';
import { LoginResponse } from 'src/app/classes/LoginResponse';
import { GeneralResponse } from 'src/app/classes/GeneralResponse';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public submitted = false;
  public infoVisible = false;
  public mensajeError = '';
  public errorLogin = false;
  public reactiveForm!: FormGroup;
  public recaptcha: any[] = [];
  constructor(private loginService: LoginService,
              private tokenService: TokenService,
              private ipService: IpService,
              private router: Router,
              private storageService: StorageService) { }

  public ngOnInit(): void {
    sessionStorage.clear();
    sessionStorage.setItem('PrimerIngresoPoliticas', 'N');
    this.reactiveForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', Validators.required),
      recaptchaReactive: new FormControl('', Validators.required),
    });
    this.ipService.obtenerIp();
  }

  public login(): void {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      this.infoVisible = true;
    } else {
      let respuesta: LoginResponse;
      this.infoVisible = false;
      this.loginService.IniciarSesion(this.reactiveForm.get('email')!.value,
                                this.reactiveForm.get('pass')!.value)
      .subscribe((data: LoginResponse) => {
        respuesta = data;
        if (respuesta.error === 'SI') {
          this.errorLogin = true;
          this.mensajeError = respuesta.mensaje;
          this.infoVisible = true;
        } else {
          this.errorLogin = false;
          this.mensajeError = '';
          sessionStorage.setItem('nomUsuario', this.reactiveForm.get('email')!.value);
          sessionStorage.setItem('passUsuario', this.reactiveForm.get('pass')!.value);
          if (respuesta.respuesta.PrimerInicioSesion === 'SI') {
            // Redirigir a politicas
            sessionStorage.setItem('PrimerIngresoPoliticas', 'S');
            this.router.navigate(['/PoliticasCondiciones']);
          }
          else{
            // Llamar a obtener Token
            this.ObtenerToken();
          }
        }
      },
      (err: GeneralResponse) => {
        this.errorLogin = true;
        this.mensajeError = err.mensaje;
        this.infoVisible = true;
      });
    }
  }

  private ObtenerToken(): void{
    this.tokenService.ObtenerToken().subscribe(
      (data: GeneralResponse) => {
        this.storageService.setCurrentSession(data.respuesta);
        this.router.navigate(['/dashboard']);
      });
  }
}
