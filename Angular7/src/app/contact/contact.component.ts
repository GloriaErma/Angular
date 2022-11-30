import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // textoPadre: string | undefined; cambia X
  textoPadre!: string;
  //////// enviando  desde el hijo hacia el Padre////////////
  textoPadre1!: string;
  recibirMensaje(mensaje: string){
    this.textoPadre1 = mensaje;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
