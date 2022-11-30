import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PoliticasCondicionesComponent } from './components/politicas-condiciones/politicas-condiciones.component';
import { SolicitudCreacionUsuarioComponent } from './components/solicitud-creacion-usuario/solicitud-creacion-usuario.component';
import { ActivarCuentaUsuarioComponent } from './components/activar-cuenta-usuario/activar-cuenta-usuario.component';
import { portalRoutes } from './portal-transaccional/portal-transaccional.routes';

const routes: Routes = [
  ...portalRoutes,
  { path: 'Login', component: LoginComponent },
  { path: 'SolicitudUsuarioNuevo', component: SolicitudCreacionUsuarioComponent },
  { path: 'CrearSolicitudUsuario', component: PoliticasCondicionesComponent },
  { path: 'ActivarCuentaUsuario/:code', component: ActivarCuentaUsuarioComponent },
  { path: 'PoliticasCondiciones', component: PoliticasCondicionesComponent},
  { path: '', redirectTo: '/Login' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash : true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
