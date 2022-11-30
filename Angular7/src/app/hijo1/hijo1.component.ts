import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hijo1',
  templateUrl: './hijo1.component.html',
  styleUrls: ['./hijo1.component.css']
})
export class Hijo1Component implements OnInit {
  paraHijo2!: string;
  @Output()
  textoCambiado: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
// emitiendo hacia el Padre lo incluido en input
  cambioTexto(texto: string){
    this.textoCambiado.emit(texto);
  }
}
