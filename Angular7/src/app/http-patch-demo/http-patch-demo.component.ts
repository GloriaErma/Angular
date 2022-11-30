import { TodoResponse } from './../todo/models/todo-response';
import { TodoService } from './../todo/services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo/models/todo';
import { compare } from 'fast-json-patch';
import { NgxSpinnerService } from 'ngx-spinner';
import { TodoClass } from '../todo/models/todo-class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-http-patch-demo',
  templateUrl: './http-patch-demo.component.html',
  styleUrls: ['./http-patch-demo.component.css']
})
export class HttpPatchDemoComponent implements OnInit {
  arr!: Todo[];
  model!: Todo;
  original!: Todo;
  loading = this.hideSpin();
  Msg: string = "TODO VA BIEN";
  Err: boolean = false;
  env: TodoClass = new TodoClass;
  public toDay: Date = new Date();

  constructor(private service: TodoService,
              private spinner: NgxSpinnerService,
              private router: Router ) { }

  ngOnInit(): void {
    this.loading = this.showSpin();
    this.TraerALL();
    // this.service.getArrayObsWithHeadres('https://localhost:44322/api/Todo/List').subscribe((response: any)=> {
    //               this.loading = this.hideSpin();
    //               this.arr = response.body;
    //               this.model = Object.assign({}, this.arr[0]);  // Clonar Objeto ptimer registro
    //               this.original = this.arr[0];
    //             },
    //             err => {
    //               this.Msg = "ERROR conexión DataBase = ApiDB";
    //               this.loading = this.hideSpin();
    //               console.log("Error: ngOnInit PATCH");
    //             } );
  }
  showSpin() {
    this.spinner.show();
  }
  hideSpin() {
    this.spinner.hide();
  }
  selReg(e: Todo){
    this.model = Object.assign({},e);
    this.original = e;
  }
  TraerALL(){
    this.service.getArrayObsWithHeadres('https://localhost:44322/api/Todo/List').subscribe((response: any)=> {
      this.loading = this.hideSpin();
      this.arr = response.body;
      // this.model = Object.assign({}, this.arr[0]);  // Clonar Objeto primer registro
      this.original = this.arr[0];
    },
    err => {
      this.Msg = "ERROR conexión DataBase = ApiDB";
      this.loading = this.hideSpin();
      console.log("Error: ngOnInit PATCH");
    } );
  }
  onSubmit(){
    this.loading = this.showSpin();
    this.model.updatedDate = this.toDay;
    const patch = compare(this.original, this.model);
    console.log (patch);
    // this.service.PatchTodo(this.model.id, patch).subscribe(response=> console.log(response));
    this.service.PatchTodo(this.model.id, patch).subscribe(
                  (data:TodoResponse) => {
                  console.log(data);
                  this.Msg = data.mensaje;
                  this.loading = this.hideSpin();
                  if ( data.error === 1){
                    this.Err = true;
                  }
                  this.TraerALL();
                },
                err => {
                  this.Msg = "ERROR conexión DataBase = ApiDB";
                  this.loading = this.hideSpin();
                  console.log("Error: ngOnInit PATCH");
                  this.loading = this.hideSpin();
                } );
  }
  put(){
    this.loading = this.showSpin();
    this.env.title = this.model.title,
    this.env.descripcion = this.model.descripcion
    this.env.done = this.model.done;
    this.env.updatedDate = this.toDay;
    console.log("ESTA ACTUALIZA PUT :"  , this.toDay, this.env);
    this.service.PutTodo(this.env,this.model.id).subscribe(
                (data:TodoResponse) => {
                console.log(data);
                this.Msg = data.mensaje;
                this.loading = this.hideSpin();
                if ( data.error === 1){
                  this.Err = true;
                }
                this.TraerALL();
              },
              err => {
                this.Msg = "ERROR conexión DataBase = ApiDB";
                this.loading = this.hideSpin();
                console.log("Error: PUT ");
                this.loading = this.hideSpin();
              } );
  }
  delete(){

    if(confirm("Are you sure you want to delete it?")){
      this.service.DeleteTodo(this.model.id).subscribe(
        (data:TodoResponse) => {
        console.log(data);
        this.Msg = data.mensaje;
        this.loading = this.hideSpin();
        if ( data.error === 1){
          this.Err = true;
        }
        this.TraerALL();
      },
      err => {
        this.Msg = "ERROR conexión DataBase = ApiDB";
        this.loading = this.hideSpin();
        console.log("Error: ngOnInit PATCH");
        this.loading = this.hideSpin();
      } );
    }
  }
  irAList(){
    this.router.navigate(['/List']);
  }


}
