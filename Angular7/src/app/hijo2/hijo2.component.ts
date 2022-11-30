import { TodoService } from './../todo/services/todo.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hijo2',
  templateUrl: './hijo2.component.html',
  styleUrls: ['./hijo2.component.css']
})
export class Hijo2Component implements OnInit {
  @Input()
  textoHijo2!: string;
  /////////////////////////////////////////////////////
  mensaje!: string;

  constructor(public service: TodoService) { }

  ngOnInit(): void {
  }

  recibirCambios(){
    this.mensaje = this.service.mensaje;
  }

}
