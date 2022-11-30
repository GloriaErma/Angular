import { FormTodoComponent } from './todo/form-todo/form-todo.component';
import { TodoService } from './todo/services/todo.service';
import { environment } from './../environments/environment';
import { AngularFireModule, ɵAngularFireSchedulers } from '@angular/fire';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';
import {​​​​​ HttpClient, HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS }​​​​​ from '@angular/common/http';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import * as admin from 'firebase-admin';
import { GetDemoComponent } from './gets/get-demo/get-demo.component';
import { FormUnoComponent } from './todo/form-uno/form-uno.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MenuComponent } from './menu/menu.component';

import { ContactComponent } from './contact/contact.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ContactHijoComponent } from './contact-hijo/contact-hijo.component';
import { PadreComponent } from './padre/padre.component';
import { Hijo1Component } from './hijo1/hijo1.component';
import { Hijo2Component } from './hijo2/hijo2.component';
import { Nieto1Component } from './nieto1/nieto1.component';
import { Nieto2Component } from './nieto2/nieto2.component';
import { PadreXComponent } from './padre-x/padre-x.component';
import { HijoXComponent } from './hijo-x/hijo-x.component';
import { PadreChildrenComponent } from './padre-children/padre-children.component';
import { HijoChildrenComponent } from './hijo-children/hijo-children.component';
import { PadreProyeccionComponent } from './padre-proyeccion/padre-proyeccion.component';
import { HijoProyeccionComponent } from './hijo-proyeccion/hijo-proyeccion.component';
import { ProyectadoComponent } from './proyectado/proyectado.component';
import { HijoStyleComponent } from './hijo-style/hijo-style.component';
import { PadreStyleComponent } from './padre-style/padre-style.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpPatchDemoComponent } from './http-patch-demo/http-patch-demo.component';
// import { MenuSecundarioComponent } from './usuarios/menu-secundario/menu-secundario.component';
// import { UsuariosComponent } from './usuarios/usuarios.component';
// import { PostsComponent } from './posts/posts.component';
import { NoFindComponent } from './no-find/no-find.component';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PostsModule } from './posts/posts.module';
import { UserService } from './service/user.service';
import { BotonPanicoComponent } from './boton-panico/boton-panico.component';
import { ContPerderCambioComponent } from './cont-perder-cambio/cont-perder-cambio.component';
import { LoginComponent } from './login/login.component';
import { GrillaComponent } from './components/grilla/grilla.component';
import { AgGridModule } from 'ag-grid-angular';
import { GrillaUpdComponent } from './components/grilla-upd/grilla-upd.component';
import { GrillaEditComponent } from './components/grilla-edit/grilla-edit.component';

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    FormTodoComponent,
    GetDemoComponent,
    FormUnoComponent,
    MenuComponent,
    ContactComponent,
    ContactHijoComponent,
    PadreComponent,
    Hijo1Component,
    Hijo2Component,
    Nieto1Component,
    Nieto2Component,
    PadreXComponent,
    HijoXComponent,
    PadreChildrenComponent,
    HijoChildrenComponent,
    PadreProyeccionComponent,
    HijoProyeccionComponent,
    ProyectadoComponent,
    HijoStyleComponent,
    PadreStyleComponent,
    HttpPatchDemoComponent,
   // MenuSecundarioComponent, // Creacion usuarios-routing.module
   // UsuariosComponent,   // Creacion usuarios-routing.module
   // PostsComponent, // Creacion posts-routing.module
    NoFindComponent,
   ContPerderCambioComponent,
   LoginComponent,
   GrillaComponent,
   GrillaUpdComponent,
   GrillaEditComponent,
  //  BotonPanicoComponent
  ],
  imports: [
    BrowserModule,
    UsuariosModule,   // EN reglas de ruteo el ORDEN importa, la pasamos ANTES...AppRoutingModule
    PostsModule,      // EN reglas de ruteo el ORDEN importa, la pasamos ANTES...AppRoutingModule
    AppRoutingModule,
    AngularFireModule,
    NgbModule,            //boostrap
    ReactiveFormsModule,
    HttpClientModule,     //API
    FormsModule,          //[(ngModel)] , formularios
    NgxSpinnerModule,       //NgxSpinner
    BrowserAnimationsModule,   //NgxSpinner
    //PostsModule,     // EN reglas de ruteo el ORDEN importa, la pasamos ANTES...AppRoutingModule
    //UsuariosModule   // EN reglas de ruteo el ORDEN importa, la pasamos ANTES...AppRoutingModule
    // CommonModule       //ngStyles
    AgGridModule.withComponents([])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers: [TodoService,
    UserService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,   //services/auth-interceptor
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: environment,
      useValue: {
        siteKey: environment
      }
    },
  ],  // GECS: Aqui incluir servicios, YA se puede utilizar INYECCION en
  // cualquier Componente de AppModule en declarations....
  bootstrap: [AppComponent],
  entryComponents: [TodoFormComponent, FormTodoComponent,FormUnoComponent]    //crear dinamicamente
})
export class AppModule { }
