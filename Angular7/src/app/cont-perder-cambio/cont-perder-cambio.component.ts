import { PuedeDesactivar } from './../can-deactivate.guard';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cont-perder-cambio',
  templateUrl: './cont-perder-cambio.component.html',
  styleUrls: ['./cont-perder-cambio.component.css']
})
export class ContPerderCambioComponent implements OnInit, PuedeDesactivar {
  enviado = false;
  mensaje!: string;

  constructor() { }

  enviar(){
    alert('Mensaje Enviado:'+ this.mensaje);
    this.enviado = true
  }
  permitirSalirDeRuta(): boolean | Observable<boolean> | Promise<boolean>  {
    if (!this.mensaje || this.enviado){
      return true;
    }
    const confrmacion = window.confirm("Quieres SALIR del formulario y perder cambios?");
      return confrmacion;
  }
  ngOnInit(): void {
  }

}
