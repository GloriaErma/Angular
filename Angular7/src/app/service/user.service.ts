import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiJasonPlace + 'posts/';
  baseUrlUs = environment.apiJasonPlace + 'users/';
  baseUrlPo = environment.apiJasonPlace + 'posts/';
  constructor(private http: HttpClient) { }

  getUser(userId:string){
    const url = this.baseUrl + userId
    return this.http.get<User>(url);
  }
  obtenerUsuarios() {
    return this.http.get<Usuario[]>(this.baseUrlUs);
  }
  obtenerPosts() {
    return this.http.get<Post[]>(this.baseUrlPo);
  }
  obtenerPostXUsuario(id: string){
    // comilla alt 96 `  azul
    const url = `${this.baseUrlPo}?userId=${id}`;
    return this.http.get<Post[]>(url);
  }

}
