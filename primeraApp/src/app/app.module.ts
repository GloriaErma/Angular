import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { BorrarComponent } from './borrar/borrar.component';

import { FormsModule } from '@angular/forms';  // Two way data binding GECS

import { HttpClientModule } from '@angular/common/http';
import { EmpInterpolarComponent } from './emp-interpolar/emp-interpolar.component';  // Services/api GECS


@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    EmpleadoComponent,
    BorrarComponent,
    EmpInterpolarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,               // Two way data binding GECS
    HttpClientModule           // Services/api GECS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
