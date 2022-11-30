import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HijoChildrenComponent } from '../hijo-children/hijo-children.component';
import { HijoXComponent } from '../hijo-x/hijo-x.component';

@Component({
  selector: 'app-padre-children',
  templateUrl: './padre-children.component.html',
  styleUrls: ['./padre-children.component.css']
})
export class PadreChildrenComponent implements AfterViewInit {
  arr = [1,2,3];
  @ViewChildren(HijoChildrenComponent)
  hijos!: QueryList<HijoChildrenComponent>;
  sel!: number;
  ///// DESPUES QUE cargen componentes hijos
  ngAfterViewInit():void{
    this.hijos.changes.subscribe((componentes: QueryList<HijoChildrenComponent>) =>{
      componentes.forEach(componente =>{

      })
    });

  }

  agregar() {
    this.arr.push(this.arr.length + 1)
  }

  remover(){
    this.arr.pop();
  }

  voltearColor(index: number ){
    if (!index) {return; }
    const componente = this.hijos.toArray()[index];
    componente.voltearColor();
  }

  voltearColores(){
    this.hijos.forEach((componente: HijoChildrenComponent) => {
      componente.voltearColor();
    })
  }

}
