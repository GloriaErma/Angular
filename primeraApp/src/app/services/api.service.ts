import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private urlApi = 'https://jsonplaceholder.typicode.com/posts';
  getAllPosts(){
    return this.http.get(this.urlApi)
  }
}
