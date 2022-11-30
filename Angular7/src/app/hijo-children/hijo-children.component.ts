import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hijo-children',
  templateUrl: './hijo-children.component.html',
  styleUrls: ['./hijo-children.component.css']
})
export class HijoChildrenComponent implements OnInit {
  colorCheck = true;

  constructor() { }

  ngOnInit(): void {
  }

  voltearColor(){
    this.colorCheck = !this.colorCheck;
  }
}
