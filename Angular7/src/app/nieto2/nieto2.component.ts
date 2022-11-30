import { TodoService } from './../todo/services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nieto2',
  templateUrl: './nieto2.component.html',
  styleUrls: ['./nieto2.component.css']
})
export class Nieto2Component implements OnInit {
  val!: string;
  mensaje!: string;


  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.service.enviarMensajeObservable.subscribe(data=> {
      this.mensaje = data;
    })
  }

  cambioTexto(mensaje:string){
    this.service.enviarMensaje(mensaje);
  }

}
