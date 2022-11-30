import { TodoService } from './../services/todo.service';
import { Todo } from './../models/todo';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { PuedeDesactivar } from 'src/app/can-deactivate.guard';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit, PuedeDesactivar {

  todoForm!: FormGroup;
  objActivar!: Todo;
  todo: Todo[] = [];
  array: Todo[] = [];
  Msg: string = "TODO VA BIEN";
  checkService = false;
  loading = this.showSpin();
  enviado = false;
  mensaje!: string;

  constructor(private formBuilder: FormBuilder, // Servicio construir un formulario creando un FormGroup ,
    // FormControl es un objeto qué se usa en los formularios
    // FormGroup es un cojunto de FormControls,
    public activeModal: NgbActiveModal,  // Servicio Modal activo
    public service: TodoService,
    private spinner: NgxSpinnerService, ) {    // Servicio atributo de clase, atributo en constructor y asignamos en contructor
      //  NO en el contructor del componente db estar en servicio...
    //http.get<Message[]>(baseUrl + "api/Chat/Message").subscribe(result => {
    //  this.lstMsg = result;
    //}, error => console.error(error));
    //alert('chat.component.tes:::::::: + error   ');
    //console.log(Error);
    alert("estoy en todo_form y voy a llamar TodoService.getTodos ");
    this.checkService = true;
    // this.service.getTodosSub('https://localhost:44322/api/Todo/Text');
    // this.service.getTodosObs('https://localhost:44322/api/Todo/Text');
  }

  ngOnInit(): void {

    this.getTodoALL();

    this.todoForm = this.formBuilder.group({
      title: ['',Validators.required],
      descripcion: ['', Validators.required],
      done:false
    });

  }
  enviar(){
    alert('Mensaje Enviado:'+ this.mensaje);
    this.enviado = true
  }
  permitirSalirDeRuta(): boolean | Observable<boolean> | Promise<boolean>  {
    if (!this.mensaje || this.enviado){
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

  getTodoALL(){
  // this.service.getTodosObs('https://localhost:44322/api/Todo/Text').subscribe(data=>{this.todo=data;});
    this.loading = this.showSpin();
    this.service.getTodosObs('https://localhost:44322/api/Todo/Text').subscribe(
                    (data:Todo[]) => {
                    this.loading = this.hideSpin();
                    if (data != null){
                      console.log("Interfaz TODO", data);
                      this.todo = data;
                      for (let i = 0; i < this.todo.length; i++) {
                        console.log("el Arreglo Todo[0] tiene ", this.todo[i]);
                        this.todoForm = this.formBuilder.group({
                          title: [this.todo[0].title,Validators.required],
                          descripcion: [this.todo[0].descripcion, Validators.required],
                          done:[this.todo[0].done, Validators.required],
                        });
                      };
                    } else {
                      this.Msg = "NO HAY DATOS EN TABLA TODO DE LA BASE DataBase=ApiDB";
                    }
                  },
                    err => {
                      this.Msg = "ERROR conexión 1 * BASE DataBase=ApiDB";
                      this.loading = this.hideSpin();
                      console.log("Error:: getTodoALL Todo[]");
                    } );
    this.loading = this.showSpin();
    this.service.getArrayObs('https://localhost:44322/api/Todo/Text').subscribe(
                      (data:Todo[]) => {
                      this.loading = this.hideSpin();
                      if (data != null){
                        console.log("Arreglo [data ]", data);
                        this.array = data;
                        console.log("Arreglo [array ]",this.array);
                      } else {
                        this.Msg = "NO HAY DATOS EN TABLA TODO DE LA BASE DataBase=ApiDB";
                      }
                    },
                      err => {
                        this.Msg = "ERROR conexión 2 ** BASE DataBase=ApiDB";
                        this.loading = this.hideSpin();
                        console.log("Error:: getTodoALL Todo[]");
                      } );
    }

  saveTodo(){
    alert('Mensaje Enviado:'+ this.mensaje);
    this.enviado = true
    //Validar formulario
    if (this.todoForm.invalid){
      return;
    }
    //Enviar Info hacia Firebase
    else{
      this.InyectarServicio();
      this.CrearActivacion();}
    }

    InyectarServicio() {
      throw new Error('Method not implemented.');
    }



    AsignarValoresCamposFinal(): void {
      this.objActivar ={
        id: this.todoForm.get('id')?.value,
        title: this.todoForm.get('title')?.value,
        descripcion: this.todoForm.get('descripcion')?.value,
        done: this.todoForm.get('done')?.value,
        createdDate: new Date,
        updatedDate: new Date,
      };
      console.log("El registro ingresado es: ", this.objActivar);
    }

    CrearActivacion(): void {
      throw new Error('Method not implemented.');
    }


}
