import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './models/post';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class PostsResolverGuard implements Resolve<Post[]> {

  constructor(private wService: UserService,
              private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Post[] | Observable<Post[]> | Promise<Post[]> {
    if (route.paramMap.has('id')){
      return this.wService.obtenerPostXUsuario(route.paramMap.get('id')!).pipe(catchError(err=> {
        this.router.navigate(['/usuarios'])
        return EMPTY;
      }))
    } else{
      return this.wService.obtenerPosts();
    }
  }


}
