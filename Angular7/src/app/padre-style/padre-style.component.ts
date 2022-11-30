import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-padre-style',
  templateUrl: './padre-style.component.html',
  styleUrls: ['./padre-style.component.css'],
  // encapsulation: ViewEncapsulation.Emulated    //X Default
  encapsulation: ViewEncapsulation.ShadowDom   // Aislado
  // tanto Padre como hijo se aislan del style de la aplicacion
  // quedan con el Aislado del padre
})
export class PadreStyleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
