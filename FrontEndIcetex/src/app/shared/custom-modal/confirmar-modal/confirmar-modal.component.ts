import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'confirmar-modal',
    templateUrl: './confirmar-modal.component.html',
    styleUrls: ['./confirmar-modal.component.css']
  })
  export class ConfirmarModalComponent {
    public encabezadoModal = '';
    public mensajeError = '';
    constructor(
        private router: Router,
        public dialogRef: MatDialogRef<ConfirmarModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {}

    cancelar(): void {
        this.dialogRef.close();
    }

    confirmar(): void {
       this.router.navigate(['Login']);
       this.dialogRef.close();
    }
}
