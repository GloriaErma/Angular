import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { MenuSecundarioComponent } from './menu-secundario/menu-secundario.component';
import { UsuariosListadoComponent } from './usuarios-listado/usuarios-listado.component';
import { UsuariosDetalleComponent } from './usuarios-detalle/usuarios-detalle.component';
import { BotonPanicoComponent } from '../boton-panico/boton-panico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    UsuariosComponent,  // Creacion usuarios-routing.module MoDULO DE CARACTERISTICAS
    MenuSecundarioComponent,
    UsuariosListadoComponent,
    UsuariosDetalleComponent,
    BotonPanicoComponent
  ],
  imports: [
    UsuariosRoutingModule,  // Creacion usuarios-routing.module
    CommonModule,
    NgxSpinnerModule,       //NgxSpinner
    BrowserAnimationsModule,   //NgxSpinner

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class UsuariosModule { }
