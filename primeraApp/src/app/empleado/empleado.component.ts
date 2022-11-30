import { Component, OnInit } from '@angular/core';
import { ApiService }        from './.././services/api.service';    // Services/api GECS
//C:\Users\Gloria Erma\Angular\primeraApp\src\app\services\api.service.ts

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
   //COMILLA doble/simple normal UNA LINEA
//  //   `  ALT 96 `  ALT 96 `  ALT 96 `  ALT 96 `  ALT 96 `
// template:  `
//     <p>
//       borrar works!
//     </p>
//   `,
//  template: "<p>Aquí empleado works!</p>",
// styleUrls: ['./empleado.component.css']
  styles:["p{background-color: green;}"]
})

// ARCHIVOS INLINE NO definirlo en archivo externo:  styleUrls: ['./empleado.component.css']
// SE PUEDE BORRAR LOS ARCHIVOS.
export class EmpleadoComponent implements OnInit {
  public name: string | undefined;     // Two way data binding GECS
  public posts: any;
  constructor(private api:ApiService) { }           // Inyectar Services/api en constructor GECS

  ngOnInit(): void {
    this.api.getAllPosts().subscribe(res =>this.posts = res);
  }

}
