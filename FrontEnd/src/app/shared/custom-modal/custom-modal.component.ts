import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TipoMensajeEnum } from './tipo-mensaje.modal';

@Component({
    selector: 'custom-modal',
    templateUrl: 'custom-modal.component.html',
  })
  export class CustomModalComponent implements OnInit {
    public encabezadoModal = '';
    constructor(
        public dialogRef: MatDialogRef<CustomModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit(): void {
        switch (this.data.tipoMensaje) {
            case TipoMensajeEnum.success:
                this.encabezadoModal = '<div class="alert-success-govco alert alert-dismissible fade show" aria-label="Alerta caso éxito"><div class="alert-heading">' +
                '<i class="fas fa-check-circle icon-color-green fa-2x pr-2"></i><span class="headline-l-govco">$mensaje</span></div></div>'
                .replace('$mensaje', this.data.mensaje);
                break;
            // case TipoMensajeEnum.primary:
            //     this.encabezadoModal = '<div class="alert-primary-govco alert alert-dismissible fade show" aria-label="Alerta informativa"><div class="alert-heading">' +
            //     '<i class="fas fa-check-circle icon-color-blue fa-2x pr-2"></i><span class="headline-l-govco">Información</span></div><p>$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
            //     break;
            case TipoMensajeEnum.warning:
                this.encabezadoModal = '<div class="alert-warning-govco alert alert-dismissible fade show" aria-label="Alerta advertencia"><div class="alert-heading">' +
                '<i class="fas fa-check-circle icon-color-yellow fa-2x pr-2"></i><span class="headline-l-govco">Importante</span></div><p>$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
                break;
            // <!-- GECS  segun diseñador Carlos Reyes 2-Dic-2020 -->
            // case TipoMensajeEnum.wrong:
            // tslint:disable-next-line: max-line-length
            //     this.encabezadoModal = '<div class="alert-wrong-govco alert alert-dismissible fade show" aria-label="Alerta caso error"><div class="alert-heading">' +
            // tslint:disable-next-line: max-line-length
            //     '<i class="fas fa-times icon-color-red fa-2x pr-2"></i><span class="headline-l-govco">Importante</span></div><p>$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
            //     break;
            case TipoMensajeEnum.primary:
                    this.encabezadoModal = '$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
                    break;
        //     default:
        //         this.encabezadoModal = '<div class="alert-primary-govco alert alert-dismissible fade show" aria-label="Alerta informativa"><div class="alert-heading">' +
        //         '<i class="fas fa-exclamation-circle icon-color-blue fa-2x pr-2"></i><span class="headline-l-govco">Información</span></div><p>$mensaje</p></div>'.replace('$mensaje', this.data.mensaje);
        }
    }
    
      onNoClick(): void {
        this.dialogRef.close();
      }
  }