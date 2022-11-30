import { Component, OnInit, ViewChild } from '@angular/core';
import { HijoXComponent } from '../hijo-x/hijo-x.component';

@Component({
  selector: 'app-padre-x',
  templateUrl: './padre-x.component.html',
  styleUrls: ['./padre-x.component.css']
})
export class PadreXComponent implements OnInit {
/////////// REFERENCIA DE PLANTILLA ////////////////////////
      // @ViewChild('hijo')
      // REFplantillaHijo!: HijoXComponent;
///////////// TIPO DE COMPONENTE ///////////////////////////
  @ViewChild(HijoXComponent)
  TIPOcomponenteHijo!: HijoXComponent;


  texto!: string;
  mensajeError!: string;

  constructor() { }

  ngOnInit(): void {
  }

  /////////// REFERENCIA DE PLANTILLA ////////////////////////
  // enviarMsg(){
  //   if (!this.texto){
  //     this.mensajeError = "Debe escribir primero el mensaje";
  //   } else{
  //     this.mensajeError = "";
  //     this.REFplantillaHijo.editarMsg(this.texto);
  //   }
  // }

  
  enviarMsgC(){
    if (!this.texto){
      this.mensajeError = "Debe escribir primero el mensaje";
    } else{
      this.mensajeError = "";
      this.TIPOcomponenteHijo.editarMsg(this.texto);
    }
  }

}
