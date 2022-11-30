import { PostsComponent } from './posts.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { MenuPostComponent } from './menu-post/menu-post.component';
import { BotonPanicoComponent } from '../boton-panico/boton-panico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PostResolvComponent } from './post-resolv/post-resolv.component';

@NgModule({
  declarations: [
    PostsComponent,      // Creacion posts-routing.module
    MenuPostComponent, PostResolvComponent,
    //BotonPanicoComponent // NO permite declararlo en mas de un NgModule

  ],
  imports: [
    PostsRoutingModule,    // Creacion posts-routing.module
    CommonModule,
    NgxSpinnerModule,       //NgxSpinner
    BrowserAnimationsModule,   //NgxSpinner

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class PostsModule { }
