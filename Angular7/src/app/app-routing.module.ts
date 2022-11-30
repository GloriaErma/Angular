import { CanDeactivateGuard } from './can-deactivate.guard';
import { BotonPanicoComponent } from './boton-panico/boton-panico.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanDeactivate } from '@angular/router';
import { FormTodoComponent } from './todo/form-todo/form-todo.component';
import { ContactComponent } from './contact/contact.component';
import { PadreComponent } from './padre/padre.component';
import { PadreXComponent } from './padre-x/padre-x.component';
import { PadreChildrenComponent } from './padre-children/padre-children.component';
import { PadreProyeccionComponent } from './padre-proyeccion/padre-proyeccion.component';
import { PadreStyleComponent } from './padre-style/padre-style.component';
import { HttpPatchDemoComponent } from './http-patch-demo/http-patch-demo.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PostsComponent } from './posts/posts.component';
import { NoFindComponent } from './no-find/no-find.component';
import { ContPerderCambioComponent } from './cont-perder-cambio/cont-perder-cambio.component';
import { LoginComponent } from './login/login.component';
import { CanActivateGuard } from './can-activate.guard';
import { FormUnoComponent } from './todo/form-uno/form-uno.component';

const routes: Routes = [
  // { path: '', component: HomeComponent},
  // { path: '' , component: TodoListComponent},
  { path: 'panico', component: BotonPanicoComponent, outlet:'popup'},
  { path: 'contPerder', component: ContPerderCambioComponent, canDeactivate:[CanDeactivateGuard] },
  { path: 'contact', component: ContactComponent},
  { path: 'FormTodo', component: FormTodoComponent, canDeactivate:[CanDeactivateGuard]},
  { path: 'Padre', component: PadreComponent},
  { path: 'PadreX', component: PadreXComponent},
  { path: 'PadreChildren', component: PadreChildrenComponent},
  { path: 'PadreProyeccion', component: PadreProyeccionComponent},
  { path: 'PadreStyle', component: PadreStyleComponent},
  { path: 'Patch', component: HttpPatchDemoComponent},
  { path: 'List', component: TodoListComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'usuarios', component: UsuariosComponent, canActivate: [CanActivateGuard]},
  { path: 'FormUno', component: FormUnoComponent, canDeactivate:[CanDeactivateGuard]},

 // { path: 'usuarios', component: UsuariosComponent},  // Creacion usuarios-routing.module
 // { path: 'posts', component: PostsComponent},   // Creacion posts-routing.module
 // { path: 'usuarios/:id/posts', component: PostsComponent},  // Creacion posts-routing.module

  { path: '' , redirectTo: '/List', pathMatch:'full'},  //primera ruta
  // { path: '**', redirectTo: '/List', pathMatch:'full'}, //Wildcard LAST route
  // se cambia X  IMPORTANTE ORDEN
  { path: '_', component: NoFindComponent}, //Wildcard


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 // imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
