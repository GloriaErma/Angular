import { TodoService } from './../todo/services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css']
})
export class PadreComponent implements OnInit {

  textoHijo1!: string;

  constructor(public service: TodoService) { }

  ngOnInit(): void {
  }

}
