import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hijo-style',
  templateUrl: './hijo-style.component.html',
  styleUrls: ['./hijo-style.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom   // Aislado
  encapsulation: ViewEncapsulation.Emulated    //X Default
  // tanto Padre como hijo se aislan del style de la aplicacion
  // quedan con el Aislado del padre
})
export class HijoStyleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
