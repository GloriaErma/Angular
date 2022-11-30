import { TodoClass } from './../models/todo-class';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../models/todo';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.css']
})
export class FormTodoComponent implements OnInit {

  todo: Todo[] = [];
  array: Todo[] = [];
  Msg: string = "TODO VA BIEN";
  sel: TodoClass = new TodoClass;
  form!: FormGroup;
  NoVerFecha: boolean = true;
  public toDay: Date = new Date();
  loading = this.showSpin();

  constructor( private service: TodoService,
               private formBuilder: FormBuilder,
               private datePipe: DatePipe,
               private spinner: NgxSpinnerService ) { }  //1. Servicio private // Servicio construir un formulario creando un FormGroup

  ngOnInit() {   //inicialización componente
    this.getTodoALL()
    console.log(this.datePipe.transform(this.toDay,"yyyy-MM-dd"));

    this.form = this.formBuilder.group({
      title: [this.sel.title,Validators.required],
      descripcion: [this.sel.descripcion, Validators.required],
      createdDate: [this.sel.createdDate, Validators.required],
      done: [this.sel.done ],
      updatedDate: [this.sel.updatedDate, Validators.required],
    });

  }
  // 3. Servicio método que jecuta servicio inyectado en constructor
  // 4. Servicio en HTML crea botón
  handleClick(){
    this.service.fireAlert("i have been clicked");
  }
  showSpin() {
    this.spinner.show();
  }
  hideSpin() {
    this.spinner.hide();
  }
  getTodoALL(){
    // this.service.getArrayObs('https://localhost:44322/api/Todo/List').subscribe(
    //               (data:Todo[]) => {
    //               if (data != null){
    //                 this.array = data;
    //                 this.todo = data;
    //                 console.log("Arreglo [array ]",this.array);
    //               } else {
    //                 this.Msg = "NO HAY DATOS EN TABLA TODO DE LA BASE DataBase=ApiDB";
    //               }
    //             },
    //               err => {
    //                 this.Msg = "ERROR conexión DataBase = ApiDB";
    //                 console.log("Error: getTodoALL Todo[]");
    //               } );
    //////////////para logear consola respuestas dl servicio //////////////////////
      this.loading = this.showSpin();
      this.service.getArrayObsWithHeadres('https://localhost:44322/api/Todo/List').subscribe(
                  (response: any) => {
                  this.loading = this.hideSpin();
                  if (response != null){
                    this.array = response.body;
                    this.todo = response.body;
                    console.log("response: ",response);
                  } else {
                    this.Msg = "NO HAY DATOS EN TABLA TODO DE LA BASE DataBase=ApiDB";
                  }
                },
                  err => {
                    this.Msg = "ERROR conexión DataBase = ApiDB";
                    this.loading = this.hideSpin();
                    console.log("Error: getTodoALL Todo[]");
                  } );
    //////////////////////////////////////
    }
  AddEdit(){
    // NO hay empleado seleccionado == 0
    if (this.sel.id === 0){
      this.sel.id = this.array.length+1;
      if (!this.sel.done){
        this.sel.done = false
      }

      this.sel.title = this.form.controls['title'].value,
      this.sel.descripcion = this.form.controls['descripcion'].value
      this.sel.done = this.form.controls['done'].value
      this.sel.createdDate = this.toDay;
      this.sel.updatedDate = this.form.controls['updatedDate'].value

      console.log ("sel:  ", this.sel)
      this.array.push(this.sel);
      console.log("PUSH:TODO::", this.todo)
      console.log("PUSH::ARRAY:", this.array)
    }
      // limpiar input
    this.sel = new TodoClass();
  }
  // SELECCION DE CADA REGISTRO DE CLASE
  openForEdit(e: TodoClass){
    this.sel = e;
    this.form = this.formBuilder.group({
      title: [this.sel.title,Validators.required],
      descripcion: [this.sel.descripcion, Validators.required],
      done: [this.sel.done],
      createdDate: [this.sel.createdDate],
      updatedDate: [this.sel.updatedDate, Validators.required],
    });
  }
  delete(){
    // El método filter te genera un nuevo array,
    // tomado del array principal, con los elementos que cumplan una condición.
    if(confirm("Are you sure you want to delete it?")){
      this.array= this.array.filter(x=>x!=this.sel);
      this.sel = new TodoClass();
    }
  }
}
