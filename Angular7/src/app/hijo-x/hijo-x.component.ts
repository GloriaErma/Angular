import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hijo-x',
  templateUrl: './hijo-x.component.html',
  styleUrls: ['./hijo-x.component.css']
})
export class HijoXComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mensaje!: string;
  editarMsg(mensaje: string){
    this.mensaje = mensaje;
  }



}
