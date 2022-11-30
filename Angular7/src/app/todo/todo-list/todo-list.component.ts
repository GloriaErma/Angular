import { FormTodoComponent } from './../form-todo/form-todo.component';
import { TodoFormComponent } from './../todo-form/todo-form.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormUnoComponent } from '../form-uno/form-uno.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  texto!: string;
  opcion: [string] | undefined;
  loading = this.showSpin();
  crear = false;

  constructor(private modalService: NgbModal,
              private router: Router,
              private spinner: NgxSpinnerService)  { }   // Servicio modal de Boostrap

  ngOnInit(): void {
     this.spin();
  }
  // spinner ends after 5 seconds
  spin(): void{
    setTimeout(()=> {
      this.loading = this.hideSpin();
    }, 0 );
  }
  // sp(): void{
  //   this.spinner.show();
  //   setTimeout(()=> {
  //     this.spinner.hide();
  //   }, 5000 );
  // }
  showSpin() {
    this.spinner.show();
  }
  hideSpin() {
    this.spinner.hide();
  }
  clickAddTodo(){
    // GECS: alert("HELLO");
    const modal = this.modalService.open(TodoFormComponent);
    modal.result.then(
      this.ModalClose.bind(this),
      this.ModalClose.bind(this)
    )
  }
  VerModUno(){
    // alert("Form");
    const modal = this.modalService.open(FormUnoComponent);
    modal.result.then(
      this.ModalClose.bind(this),
      this.ModalClose.bind(this)
    )
  }
  CreaModUno(){
    // alert("Form");
    this.crear = true;
    const modal = this.modalService.open(FormUnoComponent);
  }
  ModalClose(){
    if(confirm("Are you sure you want to close it?") || !this.crear){
      alert("se cerro el modal");
    }
    const confrmacion = window.confirm("Quieres SALIR del formulario y perder cambios?");
    return confrmacion;
  }
  irAPatch(){
    this.router.navigate(['/Patch']);
  }


}


