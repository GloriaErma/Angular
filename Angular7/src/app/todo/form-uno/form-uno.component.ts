import { TodoClass } from './../models/todo-class';
import { TodoResponse } from './../models/todo-response';
import { TodoService } from './../services/todo.service';
import { TodoViewModel } from './../models/todo-view-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../models/todo';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { PuedeDesactivar } from 'src/app/can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-uno',
  templateUrl: './form-uno.component.html',
  styleUrls: ['./form-uno.component.css']
})
export class FormUnoComponent implements OnInit, PuedeDesactivar {
  todoForm!: FormGroup;
  Err: boolean = false;
  todo!: Todo;
  env: TodoClass = new TodoClass;
  Msg: string = "Transacción Exitosa";
  public toDay: Date = new Date();
  loading = this.hideSpin();
  enviado = false;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal,
              private service: TodoService,
              private spinner: NgxSpinnerService  ) { }

  ngOnInit(): void {

    this.todoForm = this.formBuilder.group({
      title: ['',Validators.required],
      descripcion: ['', Validators.required],
      done:false
    });
  }
  close() {
    const confrmacion = window.confirm("Quieres SALIR del formulario y perder cambios?");
    if ( confrmacion ){
      this.activeModal.close('success');
    }
  }
  permitirSalirDeRuta(): boolean | Observable<boolean> | Promise<boolean>  {
    console.log("pasa permitirSalirDeRuta", this.enviado)
    if ( this.enviado){
      return true;
    }
    const confrmacion = window.confirm("Quieres SALIR del formulario y perder cambios?");
      return confrmacion;
  }

  showSpin() {
    this.spinner.show();
  }
  hideSpin() {
    this.spinner.hide();
  }
  getUno(i: string){
    this.loading = this.showSpin();
    this.Err = false;
    this.service.getUno(i).subscribe(
                  (data:TodoViewModel) => {
                    this.Err = false;
                    if ( data.error === 1){
                      this.Err = true;
                      this.todoForm = this.formBuilder.group({
                        title: "",
                        descripcion: "",
                        done: false
                      });
                      this.loading = this.hideSpin();
                    }
                    this.Msg = data.mensaje;
                    this.todo = data.data;
                    if (data != null){
                      console.log("Arreglo [array ]",data);
                      this.todoForm = this.formBuilder.group({
                        title: this.todo.title,
                        descripcion: this.todo.descripcion,
                        done: this.todo.done
                      });
                    } else {
                      this.Msg = "NO HAY DATOS EN TABLA TODO DE LA BASE DataBase=ApiDB";
                      this.loading = this.hideSpin();
                    }
                    this.loading = this.hideSpin();
                  },
                    (err:any) => {
                      this.Err = true;
                      this.Msg = "ERROR conexión DataBase = ApiDB";
                      this.loading = this.hideSpin();
                      console.log("Error: getUno TodoViewModel[]");
                    }  );
  }

  onSubmit(){
    this.enviado = true;
    this.loading = this.showSpin();
    this.env.title = this.todoForm.controls['title'].value,
    this.env.descripcion = this.todoForm.controls['descripcion'].value
    this.env.done = this.todoForm.controls['done'].value
    this.env.createdDate = this.toDay;
    this.env.updatedDate = this.toDay;
      console.log("ESTA CREANDO:"  , this.toDay, this.env)
    this.service.PostTodo(this.env).subscribe(
                    (data:TodoResponse) => {console.log(data),  this.loading = this.hideSpin();},
                    (err:any) => {
                      this.Msg = "ERROR conexión DataBase = ApiDB";
                      this.loading = this.hideSpin();
                      console.log("Error: onSubmit TodoViewModel[]", this.enviado);
                    }  );
  }

  saveTodo(){
    //Validar formulario
    if (this.todoForm.invalid){
      return;
    }
    //Enviar Info hacia Firebase
    else{
    }
  }
}
