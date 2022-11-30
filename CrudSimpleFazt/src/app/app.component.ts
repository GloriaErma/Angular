import { element } from 'protractor';
import { Employee } from './models/employee';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CrudSimpleFazt';
  emplArray: Employee[]=[
    {id:1, name:"Ryan", country:"USA"},
    {id:2, name:"Nika", country:"USA"},
    {id:3, name:"Angelica", country:"USA"},
  ];
  sel: Employee = new Employee();

  AddEdit(){
    // NO hay empleado seleccionado
    if (this.sel.id === 0){
      this.sel.id = this.emplArray.length+1;
      this.emplArray.push(this.sel);
    }
    // limpiar input
    this.sel = new Employee();
  }
  openEdit(e: Employee){
    this.sel = e;
  }
  delete(){
    // El método filter te genera un nuevo array,
    // tomado del array principal, con los elementos que cumplan una condición.
    if(confirm("Are you sure you want to delete it?")){
      this.emplArray= this.emplArray.filter(x=>x!=this.sel);
      this.sel = new Employee();
    }

  }

}
