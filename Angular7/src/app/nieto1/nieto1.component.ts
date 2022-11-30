import { TodoService } from './../todo/services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nieto1',
  templateUrl: './nieto1.component.html',
  styleUrls: ['./nieto1.component.css']
})
export class Nieto1Component implements OnInit {
  val!: string;
  mensaje!: string;


  constructor(private service: TodoService ) { }

  ngOnInit(): void {
    this.service.enviarMensajeObservable.subscribe(data =>{
    this.mensaje = data;
    } )
  }

  cambioTexto(mensaje:string){
    this.service.enviarMensaje(mensaje);
  }

}
