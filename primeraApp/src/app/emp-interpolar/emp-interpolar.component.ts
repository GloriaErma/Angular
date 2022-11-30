import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-interpolar',
  templateUrl: './emp-interpolar.component.html',
  styleUrls: ['./emp-interpolar.component.css']
})
export class EmpInterpolarComponent implements OnInit {
  nombre = "Juan";
  apellido = "Diaz";
  private   edad=18;
  empresa= "Píldoras Informáticas";
  arr = [];
  getEdad(){
    return this.edad;
  }
  callPhone(t: string){
    console.log(t);
    const tel = parseFloat(t);
    return tel;
  }
  leer(ing :string){
    const ingres = parseInt(ing);
    return ingres;
  }
  Add(value:String){
  }

  // Crear property habilitacion cuadro
  HabilCuadro = false;
  usuRegistrado = false;
  getRegistroUsu(){
    this.usuRegistrado=true;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
