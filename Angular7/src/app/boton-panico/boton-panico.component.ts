import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-panico',
  templateUrl: './boton-panico.component.html',
  styleUrls: ['./boton-panico.component.css']
})
export class BotonPanicoComponent implements OnInit {
  enviado = false;
  constructor(private ruta: Router) { }

  cerrar(){
    console.log ("enviado...................", this.enviado)
    console.log("la ruta ACTUAL es: ", this.ruta.url); //  /tu-ruta
    this.ruta.navigate([{outlets:{popup: null}}]);
    if (this.ruta.url=== "/usuarios/(popup:panico)"){
      this.ruta.navigate(['/usuarios']);
    }
    // this.ruta.navigate([{outlets:{RouterOutletUsuarios: null}}]);
  }


  ngOnInit(): void {
  }

}
