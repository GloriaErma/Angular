import { PostResolvComponent } from './post-resolv/post-resolv.component';
import { PostsResolverGuard } from './../posts-resolver.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotonPanicoComponent } from '../boton-panico/boton-panico.component';
import { CanActivateGuard } from '../can-activate.guard';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  // pasar arreglo []   pasar objeto {}
  { path: 'posts', component: PostsComponent, canActivate: [CanActivateGuard]},   // Creacion posts-routing.module
  { path: 'postR', component: PostResolvComponent, canActivate: [CanActivateGuard], resolve:{posts: PostsResolverGuard }},   // Creacion posts-routing.module

  { path: 'usuarios/:id/posts', component: PostsComponent, canActivate: [CanActivateGuard], resolve:{posts: PostsResolverGuard }},  // Creacion posts-routing.module
  //BotonPanicoComponent // NO permite declararlo en mas de un NgModule NO funciona
  { path: 'panico', component: BotonPanicoComponent, outlet:'popup'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
