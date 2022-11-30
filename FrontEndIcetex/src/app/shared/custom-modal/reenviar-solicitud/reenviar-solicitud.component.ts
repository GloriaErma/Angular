import {Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ValidaSolicitudUsuarioResponse } from 'src/app/classes/ValidaSolicitudUsuarioResponse';
import { SolicitudUsuarioService } from 'src/app/services/usuario/solicitud-usuario.service';
import { CustomModalComponent } from '../custom-modal.component';
import { TipoMensajeEnum } from '../tipo-mensaje.modal';

@Component({
    selector: 'reenviar-solicitud',
    templateUrl: './reenviar-solicitud.component.html',
    styleUrls: ['./reenviar-solicitud.component.css']
  })
  export class ReenviarSolicitudComponent {
    public encabezadoModal = '';
    public mensajeError = '';
    constructor(
        private router: Router,
        private solicitudService: SolicitudUsuarioService,
        public dialogRef: MatDialogRef<ReenviarSolicitudComponent>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    cancelarSolicitud(): void {
        this.solicitudService.EliminarSolicitudUsuario(this.data.solicitud).subscribe((data: ValidaSolicitudUsuarioResponse) => {
            if (data.error === 'NO') {
                this.mensajeError = '';
                this.dialogRef.close();
                const dialogRef = this.dialog.open(CustomModalComponent,
                { width: '450px',
                    data: {
                    mensaje: 'Se ha cancelado la solicitud correctamente',
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

    reenviarSolicitud(): void {
        this.solicitudService.ReenviarSolicitudUsuario(this.data.solicitud).subscribe((data: ValidaSolicitudUsuarioResponse) => {
            if (data.error === 'NO') {
                this.mensajeError = '';
                this.dialogRef.close();
                const dialogRef = this.dialog.open(CustomModalComponent,
                { width: '450px',
                    data: {
                    mensaje: 'Se ha enviado un email al correo electrónico registrado, confirme la solicitud y finalice el proceso ingresando link de confirmación y diligenciando formulario de solicitud',
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
