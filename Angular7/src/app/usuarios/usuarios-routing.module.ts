import { CanActivateGuard } from './../can-activate.guard';
import { UsuariosListadoComponent } from './usuarios-listado/usuarios-listado.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosDetalleComponent } from './usuarios-detalle/usuarios-detalle.component';
import { BotonPanicoComponent } from '../boton-panico/boton-panico.component';

const routes: Routes = [

  // GECS tiene otro router-outlet
  { path: 'usuarios', component: UsuariosComponent, canActivateChild: [CanActivateGuard],
    children:[
      { path: '', component: UsuariosListadoComponent, },
      { path: ':id', component: UsuariosDetalleComponent, },
      { path: 'panico', component: BotonPanicoComponent, outlet:'popup'},

    ]
  },  // Creacion usuarios-routing.module

  //
//  { path: '' , redirectTo: '/usuarios', pathMatch:'full'},  //primera ruta
  { path: 'abc' , redirectTo: '/usuarios', pathMatch:'full'},
  { path: 'xy' , redirectTo: '/usuarios', pathMatch:'prefix'}, //primer segmento es xy

];

@NgModule({
  imports: [RouterModule.forChild(routes)],  //modulo CARACTERISTICAS
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
