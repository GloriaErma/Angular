import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemLista } from 'src/app/classes/ItemLista';
import { UsuarioSolicitudFinal } from 'src/app/classes/UsuarioSolicitudFinal';
import { UsuarioSolicitudInicial } from 'src/app/classes/UsuarioSolicitudInicial';
import { ValidaSolicitudUsuarioResponse } from 'src/app/classes/ValidaSolicitudUsuarioResponse';
import { BasicoService } from 'src/app/services/helpers/basico.service';
import { SolicitudUsuarioService } from 'src/app/services/usuario/solicitud-usuario.service';
import {MatDialog} from '@angular/material/dialog';
import { CustomModalComponent } from 'src/app/shared/custom-modal/custom-modal.component';
import { TipoMensajeEnum } from 'src/app/shared/custom-modal/tipo-mensaje.modal';
import { ReenviarSolicitudComponent } from 'src/app/shared/custom-modal/reenviar-solicitud/reenviar-solicitud.component';

@Component({
  selector: 'app-solicitud-creacion-usuario',
  templateUrl: './solicitud-creacion-usuario.component.html',
  styleUrls: ['./solicitud-creacion-usuario.component.css']
})
export class SolicitudCreacionUsuarioComponent implements OnInit {
  public clicked = false;
  public titleButton = 'Continuar';
  public errorSolicitud = false;
  public mensajeError = '';
  public validaDatosBasicos = false;
  public submitted = false;
  public correoNoCoincide = false;
  public futureDateError: boolean = false;
  public solicitudForm!: FormGroup //  new FormGroup;
  public objSolicitudInicial!: UsuarioSolicitudInicial;
  public objSolicitudFinal!: UsuarioSolicitudFinal;
  public arrTiposDocumento: ItemLista[] = [];
  constructor(private basic: BasicoService,
              private solicitudService: SolicitudUsuarioService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ObtenerTiposDocumento();
    this.solicitudForm = new FormGroup({
      tipoDocumento: new FormControl('', Validators.required),
      numDocumento: new FormControl('', [Validators.required]),
      primerNombre: new FormControl('', Validators.required),
      segundoNombre: new FormControl(''),
      primerApellido: new FormControl('', Validators.required),
      segundoApellido: new FormControl(''),
      fechaNacimiento: new FormControl('', [Validators.required]),
      fechaExpedicion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      confirmaEmail: new FormControl('', [Validators.required, Validators.email]),
    });
    this.solicitudForm.setValue({
      tipoDocumento: '',
      numDocumento: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      fechaNacimiento: '',
      fechaExpedicion: '',
      email: 'a@a.net',
      confirmaEmail: 'a@a.net'});
    this.InicioFechas();
  }

  private InicioFechas(): void {
    const today = new Date();
    const dd = today.getDate();
    let sd = '';
    let sm = '';
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear().toString();
    if (dd < 10) {
      sd = '0' + dd.toString();
    } else {
      sd = dd.toString();
    }
    if (mm < 10) {
        sm = '0' + mm.toString();
    } else {
      sm = mm.toString();
    }
    const sToday = yyyy + '-' + sm + '-' + sd;
    document.getElementById('txtFechaNacimiento')!.setAttribute('max', sToday);
    document.getElementById('txtFechaExpedicion')!.setAttribute('max', sToday);
  }

  public setTodayDate() {
    const dtToday = new Date();
    let month = String(dtToday.getMonth() + 1);
    let day = String(dtToday.getDate());
    let year = dtToday.getFullYear();
    if (parseInt(month, 10) < 10) {
        month = '0' + month.toString();
    }
    if (parseInt(day, 10) < 10) {
        day = '0' + day.toString();
    }
    return `${year}-${month}-${day}`;
  }

  public checkDateValidity(date: string): boolean {
    const mxDate = new Date(this.setTodayDate());
    const inputDate = new Date(date);

    if (inputDate > mxDate) {
      return this.futureDateError = true;
    }
    return this.futureDateError = false;
  }

  public CambioFecha(): void{
    this.solicitudForm.get('fechaExpedicion')!.setValue('');
    document.getElementById('txtFechaExpedicion')!.setAttribute('min', this.solicitudForm.get('fechaNacimiento')!.value);
  }
  // alt 179 │
  public onChange(value: any ): void {
    this.solicitudForm.get('numDocumento')!.setValue('');
    const valorSelecciondoTipo = this.arrTiposDocumento.filter(t => t.id === value)[0];
    switch (valorSelecciondoTipo.valor){
      case 'NIT':
        this.solicitudForm.get('numDocumento')!.setValidators([Validators.pattern(/[a-zA-Z0-9]+/)]);
        break;
      case 'NUIP':
        this.solicitudForm.get('numDocumento')!.setValidators([Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
        break;
      case 'CEDULA DE CIUDADANIA':
        this.solicitudForm.get('numDocumento')!.setValidators([Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
        break;
      case 'PASAPORTE':
        this.solicitudForm.get('numDocumento')!.setValidators([Validators.pattern(/[a-zA-Z0-9]+/)]);
        break;
      default:
        this.solicitudForm.get('numDocumento')!.setValidators([Validators.pattern(/[a-zA-Z0-9]+/)]);
    }
  }

  public Validar(): void {
    this.submitted = true;
    if (!this.validaDatosBasicos) {
      if (this.solicitudForm.valid) {
        if (this.checkDateValidity(this.solicitudForm.get('fechaNacimiento')!.value)) {
          this.mensajeError = 'La fecha de nacimiento no debe ser una futura';
        } else if (this.checkDateValidity(this.solicitudForm.get('fechaExpedicion')!.value)) {
          this.mensajeError = 'La fecha de expedición no debe ser una futura';
        } else {
          this.submitted = false;
          this.AsignarValoresCamposInicial();
          this.ValidarSolicitud();
        }
      }
    }
    else{
      if (this.solicitudForm.valid){
        if (this.solicitudForm.get('email')!.value !== this.solicitudForm.get('confirmaEmail')!.value){
          this.mensajeError = 'Verifique la información registrada, la información de “Confirmar correo electrónico o usuario de autenticación debe ser idéntica a la registrada en el campo de “Correo electrónico o usuario de autenticación”';
        }
        else{
          this.AsignarValoresCamposFinal();
          this.CrearSolicitud();
        }
      }
    }
  }

  public Volver(): void{
    this.router.navigate(['/Login']);
  }

  private ObtenerTiposDocumento(): void {
    this.basic.ObtenerListaTiposDocumento().subscribe(data => {
      if (data!.error === 'NO') {
        for (const respuesta of data!.respuesta){
          const item: ItemLista = {
            id: respuesta.id,
            valor: respuesta.valor
          };
          this.arrTiposDocumento.push(item);
        }
      }
    });
  }

  private AsignarValoresCamposInicial(): void{
    this.objSolicitudInicial = {
      idTipoDocumento : this.solicitudForm.get('tipoDocumento')!.value,
      numeroDocumento : this.solicitudForm.get('numDocumento')!.value,
      primerNombre : this.solicitudForm.get('primerNombre')!.value,
      primerApellido : this.solicitudForm.get('primerApellido')!.value,
      segundoNombre : this.solicitudForm.get('segundoNombre')!.value,
      segundoApellido : this.solicitudForm.get('segundoApellido')!.value,
      fechaNacimiento : this.solicitudForm.get('fechaNacimiento')!.value,
      fechaExpedicionDocumento : this.solicitudForm.get('fechaExpedicion')!.value
    };
    this.solicitudForm.setValue({
      tipoDocumento: this.objSolicitudInicial.idTipoDocumento,
      numDocumento: this.objSolicitudInicial.numeroDocumento,
      primerNombre: this.objSolicitudInicial.primerNombre,
      segundoNombre: this.objSolicitudInicial.segundoNombre,
      primerApellido: this.objSolicitudInicial.primerApellido,
      segundoApellido: this.objSolicitudInicial.segundoApellido,
      fechaNacimiento: this.objSolicitudInicial.fechaNacimiento,
      fechaExpedicion: this.objSolicitudInicial.fechaExpedicionDocumento,
      email: '', confirmaEmail: ''});
  }

  private AsignarValoresCamposFinal(): void {
    this.objSolicitudFinal = {
      idTipoDocumento : this.solicitudForm.get('tipoDocumento')!.value,
      numeroDocumento : this.solicitudForm.get('numDocumento')!.value,
      primerNombre : this.solicitudForm.get('primerNombre')!.value,
      primerApellido : this.solicitudForm.get('primerApellido')!.value,
      segundoNombre : this.solicitudForm.get('segundoNombre')!.value,
      segundoApellido : this.solicitudForm.get('segundoApellido')!.value,
      fechaNacimiento : this.solicitudForm.get('fechaNacimiento')!.value,
      fechaExpedicionDocumento : this.solicitudForm.get('fechaExpedicion')!.value,
      email : this.solicitudForm.get('email')!.value
    };
  }

  private ValidarSolicitud(): void {
    this.clicked = true;
    this.solicitudService.ValidarSolicitudUsuario(this.objSolicitudInicial).subscribe(
        (data: ValidaSolicitudUsuarioResponse | null ) => {
        this.clicked = false;
        if (data!.error === 'NO') {
          this.mensajeError = '';
          if (data!.solicitudYaExiste) {
            this.objSolicitudInicial.codigo = data!.codigo;
            this.dialog.open(ReenviarSolicitudComponent,
              { width: '600px',
                data: {
                  mensaje: 'El documento ya cuenta con una solicitud de creación de usuario pendiente por confirmar',
                  solicitud: this.objSolicitudInicial
                }
              });
          } else{
            this.titleButton = 'Crear Cuenta';
            this.validaDatosBasicos = true;
            this.solicitudForm.get('numDocumento')!.disable();
            this.solicitudForm.get('tipoDocumento')!.disable();
            this.solicitudForm.get('primerNombre')!.disable();
            this.solicitudForm.get('segundoNombre')!.disable();
            this.solicitudForm.get('primerApellido')!.disable();
            this.solicitudForm.get('segundoApellido')!.disable();
            this.solicitudForm.get('fechaNacimiento')!.disable();
            this.solicitudForm.get('fechaExpedicion')!.disable();
          }
        } else {
          this.solicitudForm.get('email')!.setValue('a@a.net');
          this.solicitudForm.get('confirmaEmail')!.setValue('a@a.net');
          this.mensajeError = data!.mensaje;
        }
    });
  }

  private CrearSolicitud(): void {
    this.clicked = true;
    this.solicitudService.InsertarSolicitudUsuario(this.objSolicitudFinal).subscribe((data: ValidaSolicitudUsuarioResponse) => {
      this.clicked = false;
      if (data.error === 'NO') {
        this.mensajeError = '';
        const dialogRef = this.dialog.open(CustomModalComponent,
          { width: '450px',
            data: {
            mensaje: 'Se ha enviado un email al correo electrónico registrado, confirme la solicitud y finalice el proceso ingresando al link de confirmación y diligenciando formulario de solicitud',
            tipoMensaje: TipoMensajeEnum.primary
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigate(['Login']);
        });
      } else {
        this.mensajeError = data.mensaje;
      }
    });
  }
}

