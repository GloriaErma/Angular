import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-contact-hijo',
  templateUrl: './contact-hijo.component.html',
  styleUrls: ['./contact-hijo.component.css']
})
export class ContactHijoComponent implements OnInit {

  // @Input()
  // textoHijo: string | undefined;  cambia X
  // reciba lo que recibe desde el padre
  private _textoHijo!: string;

  @Input()
  set textoHijo(value: string){
    value = value || '';
    this._textoHijo = value.toUpperCase();
  }

  get textoHijo() { return this._textoHijo;}
 //////// enviando  desde el hijo hacia el Padre////////////
  @Output()
  enviar: EventEmitter<string> = new EventEmitter<string>();
  texto!: string;
  @Output()
  MAy: EventEmitter<string> = new EventEmitter<string>();

  botonClick(){
    this.enviar.emit(this.texto);
  }

  botonClickMay(){
    this.MAy.emit(this.texto.toUpperCase());
  }


  constructor() { }

  ngOnInit(): void {
  }

}
