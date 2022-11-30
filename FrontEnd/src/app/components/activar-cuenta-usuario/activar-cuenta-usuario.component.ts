import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemLista } from 'src/app/classes/ItemLista';
import { ActivarCuenta } from 'src/app/classes/ActivarCuenta';
import { BasicoService } from 'src/app/services/helpers/basico.service';
import { ActivaCuentaService } from 'src/app/services/usuario/activa-cuenta.service';
import { ActivarCuentaResponse } from 'src/app/classes/ActivarCuentaResponse';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from 'src/app/shared/custom-modal/custom-modal.component';
import { TipoMensajeEnum } from 'src/app/shared/custom-modal/tipo-mensaje.modal';
import { SolicitudUsuarioService } from 'src/app/services/usuario/solicitud-usuario.service';
import { UsuarioResponse } from 'src/app/classes/UsuarioResponse';
import { ConfirmarModalComponent } from 'src/app/shared/custom-modal/confirmar-modal/confirmar-modal.component';

@Component({
  selector: 'app-activar-cuenta-usuario',
  templateUrl: './activar-cuenta-usuario.component.html',
  styleUrls: ['./activar-cuenta-usuario.component.css']
})
export class ActivarCuentaUsuarioComponent implements OnInit {
  public clicked = false;
  public errorActivar = false;
  public mensajeError = '';
  public validaDatosBasicos = false;
  public contrasenaNoCoincide = false;
  public submitted = false;
  public activarForm: FormGroup;
  public objActivarFinal: ActivarCuenta;
  public arrGenero: ItemLista[] = [];
  public arrGrupoEtnico: ItemLista[] = [];
  public arrEstrato: ItemLista[] = [];
  public arrPais: ItemLista[] = [];
  public arrDepartamento: ItemLista[] = [];
  public arrCiudad: ItemLista[] = [];
  public arrCiudadRes: ItemLista[] = [];
  public arrTiposDocumento: ItemLista[] = [];
  public code: string;
  constructor(private basico: BasicoService,
              private activaService: ActivaCuentaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private solicitudService: SolicitudUsuarioService,
              public dialog: MatDialog) { }
  ngOnInit(): void {
    this.ObtenerTiposDocumento();
    this.activarForm = new FormGroup({
      tipoDocumento: new FormControl(''),
      numDocumento: new FormControl(''),
      primerNombre: new FormControl(''),
      segundoNombre: new FormControl(''),
      primerApellido: new FormControl(''),
      segundoApellido: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      fechaExpedicion: new FormControl(''),
      email: new FormControl(''),
      genero: new FormControl('', [Validators.required]),
      grupoEtnico: new FormControl('', [Validators.required]),
      estrato: new FormControl('', [Validators.required]),
      paisNac: new FormControl('', [Validators.required]),
      lugarNac: new FormControl(''),
      departamentoNac: new FormControl(''),
      ciudadNac: new FormControl(''),
      paisRes: new FormControl('', [Validators.required]),
      lugarRes: new FormControl(''),
      departamentoRes: new FormControl(''),
      ciudadRes: new FormControl(''),
      direccion: new FormControl('', [Validators.required]),
      ruralUrbano: new FormControl('', [Validators.required]),
      telefonoFijo: new FormControl('', [Validators.pattern('^[0-9]+$')]),
      telefonoCelular: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      autorizaEnvio: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\@\$\!\%\*\?\&])[a-zA-Z][a-zA-Z\\d\@\$\!\%\*\?\&]{7,}$')]),
        confirmacontrasena: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\@\$\!\%\*\?\&])[a-zA-Z][a-zA-Z\\d\@\$\!\%\*\?\&]{7,}$')]),
    });
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.code = params.get('code');
        this.activaService.ValidarVigencia(this.code).subscribe((response) => {
          if (response.error === 0) {
            this.solicitudService.ObtenerSolicitudUsuario({ codigo: this.code }).subscribe((data: UsuarioResponse) => {
              if (data.error === 'NO') {
                this.ObtenerGenero();
                this.ObtenerGrupoEtnico();
                this.ObtenerEstrato();
                this.ObtenerPais();
                this.ObtenerDepartamento();
                this.activarForm.setValue({
                    tipoDocumento: data.tipoDocumento,
                    numDocumento: data.numeroDocumento,
                    primerNombre: data.primerNombre,
                    segundoNombre: data.segundoNombre,
                    primerApellido:  data.primerApellido,
                    segundoApellido:  data.segundoApellido,
                    fechaNacimiento:  data.fechaNacimiento,
                    fechaExpedicion:  data.fechaExpedicionDocumento,
                    email:  data.correoElectronico,
                    genero:  '',
                    grupoEtnico:  '',
                    estrato:  '',
                    paisNac:  '',
                    lugarNac: '',
                    departamentoNac:  '',
                    ciudadNac:  '',
                    paisRes:  '',
                    lugarRes: '',
                    departamentoRes:  '',
                    ciudadRes:  '',
                    direccion:  '',
                    ruralUrbano:  '',
                    telefonoFijo:  '',
                    telefonoCelular:  '',
                    autorizaEnvio:  '',
                    contrasena:  '',
                    confirmacontrasena: '' });
              } else {
                const dialogRef = this.dialog.open(CustomModalComponent,
                  { width: '450px',
                    data: {
                    mensaje: data.mensaje,
                    tipoMensaje: TipoMensajeEnum.wrong
                  }
                });
                dialogRef.afterClosed().subscribe(result => {
                  this.router.navigate(['Login']);
                });
              }
            });
          } else {
            const dialogRef = this.dialog.open(CustomModalComponent,
              { width: '450px',
                data: {
                mensaje: 'Esta página no puede ser visualizada debido a que no tiene autorización o expiró su solicitud, realice el proceso nuevamente desde la página de login',
                tipoMensaje: TipoMensajeEnum.wrong
              }
            });
            dialogRef.afterClosed().subscribe(result => {
              this.router.navigate(['Login']);
            });
          }
        });
      },
      (error) => {
        throw error;
      });
  }

  public VerValidaciones(): void {
    this.dialog.open(CustomModalComponent,
      { width: '570px',
        data: {
        mensaje: 'Validaciones para ingreso de contraseña<br\>* Debe contener una letra en el primer espacio.<br\>* ' +
         'Debe contener tanto mayúsculas como minúsculas.<br\>* Debe contener caracteres especiales tales como: @, $, !, %, *, ?, &<br\>' +
         '* Debe contener números.<br\>* Una longitud mínima: 8 caracteres. ',
        tipoMensaje: TipoMensajeEnum.primary
      }
    });
  }

  public Validar(): void {
    this.submitted = true;
    this.contrasenaNoCoincide = false;
    if (this.activarForm.get('contrasena').value !== this.activarForm.get('confirmacontrasena').value){
      this.contrasenaNoCoincide = true;
    }
    else{
      if (this.activarForm.valid) {
        this.AsignarValoresCamposFinal();
        this.CrearActivacion();
      }
    }
  }

  public Volver(): void {
    this.dialog.open(ConfirmarModalComponent,
      { width: '450px',
        data: {
        mensaje: '¿Está seguro de cancelar el proceso?'
      }
    });
  }

  private ObtenerTiposDocumento(): void {
    this.basico.ObtenerListaTiposDocumento().subscribe(data => {
      if (data.error === 'NO') {
        for (const respuesta of data.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrTiposDocumento.push(item);
        }
      }
    });
  }

  public onChange(value): void {
    this.ObtenerCiudad(value);
  }

  public onChangeRes(value): void {
    this.ObtenerCiudadRes(value);
  }

  private ObtenerCiudadRes(idDepartamento): void {
    this.arrCiudadRes = [];
    this.basico.ObtenerListaCiudad(idDepartamento).subscribe(data => {
      if (data.error === 'NO'){
        for (const respuesta of data.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrCiudadRes.push(item);
        }
      }
    });
  }

  private ObtenerCiudad(idDepartamento): void {
    this.arrCiudad = [];
    this.basico.ObtenerListaCiudad(idDepartamento).subscribe(data => {
      if (data.error === 'NO'){
        for (const respuesta of data.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrCiudad.push(item);
        }
      }
    });
  }

  private ObtenerDepartamento(): void {
    this.basico.ObtenerListaDepartamento().subscribe(data => {
      if (data.error === 'NO'){
        for (const respuesta of data.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrDepartamento.push(item);
        }
      }
    });
  }

  private ObtenerPais(): void {
    this.basico.ObtenerListaPais().subscribe(data => {
      if (data.error === 'NO'){
        for (const respuesta of data.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrPais.push(item);
        }
      }
    });
  }

  public PaisNoColombiaNac(p: string): void {
    const lugar = document.getElementById('divLugarNac') as HTMLDivElement;
    const dep = document.getElementById('divDepNac') as HTMLDivElement;
    if (p !== '0') {
      if (lugar !== undefined) {
        lugar.style.display = '';
        this.activarForm.get('lugarNac').setValidators([Validators.required]);
      }
    } else {
      if (lugar !== undefined) {
        lugar.style.display = 'none';
        this.activarForm.get('lugarNac').setValidators([]);
      }
    }
    if (p === '0') {
      if (dep !== undefined) {
        dep.style.display = '';
        this.activarForm.get('departamentoNac').setValidators([Validators.required]);
        this.activarForm.get('ciudadNac').setValidators([Validators.required]);
      }
    } else {
      if (dep !== undefined) {
        dep.style.display = 'none';
        this.activarForm.get('departamentoNac').setValidators([]);
        this.activarForm.get('ciudadNac').setValidators([]);
      }
    }
  }

  public PaisNoColombiaRes(p: string): void {
    const lugar = document.getElementById('divLugarRes') as HTMLDivElement;
    const dep = document.getElementById('divDepRes') as HTMLDivElement;
    if (p !== '0') {
      if (lugar !== undefined) {
        lugar.style.display = '';
        this.activarForm.get('lugarRes').setValidators([Validators.required]);
      }
      } else {
      if (lugar !== undefined) {
        lugar.style.display = 'none';
        this.activarForm.get('lugarRes').setValidators([]);
      }
    }
    if (p === '0') {
      if (dep !== undefined) {
        dep.style.display = '';
        this.activarForm.get('departamentoRes').setValidators([Validators.required]);
        this.activarForm.get('ciudadRes').setValidators([Validators.required]);
      }
      } else {
      if (dep !== undefined) {
        dep.style.display = 'none';
        this.activarForm.get('departamentoRes').setValidators([]);
        this.activarForm.get('ciudadRes').setValidators([]);
      }
    }
  }

  private ObtenerEstrato(): void {
    this.basico.ObtenerListaEstrato().subscribe(data => {
      if (data.error === 'NO'){
        for (const respuesta of data.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrEstrato.push(item);
        }
      }
    });
  }

  private ObtenerGenero(): void {
    this.basico.ObtenerListaGenero().subscribe(data => {
      if (data.error === 'NO'){
        for (const respuesta of data.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrGenero.push(item);
        }
      }
    });
  }

  private ObtenerGrupoEtnico(): void {
    this.basico.ObtenerListaGrupoEtnico().subscribe(data => {
      if (data.error === 'NO'){
        for (const respuesta of data.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrGrupoEtnico.push(item);
        }
      }
    });
  }

  private AsignarValoresCamposFinal(): void {
    this.objActivarFinal = {
      idGenero : this.activarForm.get('genero').value,
      idGrupoEtnico : this.activarForm.get('grupoEtnico').value,
      Estrato : this.activarForm.get('estrato').value,
      idPaisNacimiento : this.activarForm.get('paisNac').value,
      lugarNac : this.activarForm.get('lugarNac').value,
      idDepartamentoNacimiento : this.activarForm.get('departamentoNac').value,
      idCiudadNacimiento : this.activarForm.get('ciudadNac').value,
      idPaisResidencia : this.activarForm.get('paisRes').value,
      lugarRes : this.activarForm.get('lugarRes').value,
      idDepartamentoResidencia : this.activarForm.get('departamentoRes').value,
      idCiudadResidencia : this.activarForm.get('ciudadRes').value,
      direccion : this.activarForm.get('direccion').value,
      rural : (this.activarForm.get('ruralUrbano').value === 'rural'),
      telefonoFijo : this.activarForm.get('telefonoFijo').value,
      telefonoCelular : this.activarForm.get('telefonoCelular').value,
      autorizaEnvioInformacion : this.activarForm.get('autorizaEnvio').value,
      contrasena : this.activarForm.get('contrasena').value,
      codigoSolicitud: this.code,
      correoElectronico: this.activarForm.get('email').value
    };
  }

  private CrearActivacion(): void {
    this.clicked = true;
    this.activaService.ActivarCuenta(this.objActivarFinal).subscribe((data: ActivarCuentaResponse) => {
      this.clicked = false;
      if (data.error === 'NO') {
        const dialogRef = this.dialog.open(CustomModalComponent,
          { width: '450px',
            data: {
            mensaje: 'Se ha creado la cuenta de usuario de manera exitosa, autentíquese con el correo electrónico y contraseña registrada durante el proceso',
            tipoMensaje: TipoMensajeEnum.primary
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['Login']);
        });
      } else {
        const dialogRef = this.dialog.open(CustomModalComponent,
          { width: '450px',
            data: {
            mensaje: data.mensaje,
            tipoMensaje: TipoMensajeEnum.wrong
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['Login']);
        });
      }
    });
  }
}
