import { TodoResponse } from './../models/todo-response';
import { TodoViewModel } from './../models/todo-view-model';
import { Todo } from './../models/todo';
import { AngularFireModule, FirebaseOptions } from '@angular/fire';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Operation } from 'fast-json-patch';

const ROOT_URL = environment.apiEndpointS;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  //// constructor(private db: AngularFireModule) { }
  //// private todoCollectionName = 'todos';
  // en  C:\Users\Gloria Erma\Angular\Angular7\package.json: "start": "ng serve --proxy-config proxy.conf.json",
  public algo: string = "Msg q viene de  public service: TodoService !!!";
  private ruta = 'Todo/Text';


  // Comunicacion con Servicios - Componentes Lejanos//////////////////
  mensaje!: string;
  head: string = "1";
  private enviaMensajeSubject = new Subject<string>();
  enviarMensajeObservable = this.enviaMensajeSubject.asObservable();
  /////////////////////////////////////////////////////////////////////
  info:any={} //donde guardaremos los datos y
  cargada=false;

  constructor(private http: HttpClient) {
      console.log("Servicio corriendo desde src\\app\\todo\\services\\todo.service.ts");
      ///return this.http.get<Todo[]>(url,{observe: 'response'});
      //http.get("https://www.ag-grid.com/example-assets/small-row-data.json")
      // this.http.get(url).subscribe(data => {  console.log(data);  },
      //                     err => {
      //                       console.log("Error: tratar subscribe");
      //                     } );
      //                       console.log("Esto se ejecutará antes que el console log de arriba");
      //                     }
      // this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json')
      //       .subscribe(resp => {
      //         console.log("Trae ag-grid", resp);
      //         this.info = resp;
      //         this.cargada = true;},
      //         err => {
      //           console.log("Error: tratar subscribe Grid");
      //         })
  }

  httpOptions = {​​​​​
    headers: new HttpHeaders({​​​​​
      'Content-Type': 'application/json'
    }​​​​​)
  }​​​​​;
  // sin esta options funciona ok

  // Comunicacion con Servicios - Componentes Lejanos//////////////////
  enviarMensaje(mensaje: string){
    this.mensaje = mensaje;
    this.enviaMensajeSubject.next(mensaje);
  }
  /////////////////////////////////////////////////////////////////////

  //////////////////////otros servicios

    getTodosSub(url:string){
      // this.http.get('https://reqres.in/api/users?page=2').subscribe(data => {
      // console.log(data);  //funcion OK
      // Con esto podemos realizar llamadas desde el servicio pero los datos que
      // se devuelven todavía NO los tenemos en el componente para poder mostrarlos.

      this.http.get(url).subscribe(data => {  console.log(data);  },
                          err => {
                            console.log("Error: tratar subscribe");
                          } );
                            console.log("Esto se ejecutará antes que el console log de arriba");
                          }
    //  this.http.get(ROOT_URL + `${this.ruta}`, this.httpOptions).subscribe(data => {
    // Agregue tipos de retorno explícitos a las funciones del servicio.
    // esto YA NO:  getTodosObs(url:string): Observable<Todo>{
    getTodosObs(url:string) {
      return this.http.get<Todo[]>(url);
    };
    // 2. Servicio Creación Método
    fireAlert(message: string){
      alert(message);
    }
    getUno(Id: string){
      const url = ROOT_URL + 'UnoAsy/' + Id;
      return this.http.get<TodoViewModel>(url);
    }
    getArrayObs(url:string) {
      ////////////// headers HTTP /////////////////////
      // if (this.head === '1'){
        // ​​​​const headers = new HttpHeaders ({​​​​​
        //   'Authorization': 'bearer token',
        //   'X-Pagination': '1'
        // }​​​​​);
        // return this.http.get<Todo[]>(url,{headers});
      // }
      // if (this.head === '2'){
        // let headers = new HttpHeaders();
        // headers = headers.append('Authorization', 'bearer token');
        // headers = headers.append('X-Pagination', '2');
        // return this.http.get<Todo[]>(url,{headers});
      // }
      ////////////// QueryString /////////////////////
      // if (this.head === '3'){
        let params = new HttpParams();
        params = params.append('X-Pagination', '3');
        return this.http.get<Todo[]>(url,{params});
      // }

    }

    getArrayObsWithHeadres(url:string) {
      return this.http.get<Todo[]>(url,{observe: 'response'});
    };

    //// grilla.component   met
    getGrilla(url: string) {
      return  this.http.get<any[]>(url,{observe: 'response'});
    }


    PostTodo(todo: Todo){
      const url = ROOT_URL + 'Add';
      return this.http.post<TodoResponse>(url, todo)
    }

    PutTodo(todo: Todo, Id: number){
      const url = ROOT_URL + 'Put/' + Id;
      return this.http.put<TodoResponse>(url, todo)
    }
    PatchTodo(Id: number, op: Operation[]){
      const url = ROOT_URL + 'Pat/' + Id;
      return this.http.patch<TodoResponse>(url, op)
    }

    DeleteTodo( Id: number){
      const url = ROOT_URL + 'Del/' + Id;
      return this.http.delete<TodoResponse>(url)
    }


}




  // getTodos(): Observable<Firebase.QuerySnapshot></Firebase.QuerySnapshot>{
  //     return this.db.collection<Todo>(this.todoCollectionName, ref => ref.orderBy ('updatedDate'))
  //   }
  // saveTodo():(todo: Todo): Promise<DocumentReference> {
  //   return this.db.collection(this.todoCollectionName).add(todo);
  // }
  // editTodo(todo: TodoViewModel): Promise<void> {
  //   return this.db.collection(this.todoCollectionName).doc(todo.id).update(todo);
  // }
  // editTodoPartial(id: string, obj:Object): Promise<void> {
  //   return this.db.collection(this.todoCollectionName).doc(id).update(obj);
  // }

  // deleteTodo(idTodo:string): Promise<void> {
  //   return this.db.collection(this.todoCollectionName).doc(idTodo).delete((obj);Date'))
  // }
