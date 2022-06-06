import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Todo} from "./todo";
import {HttpClient} from "@angular/common/http";

const API = "http://localhost:8080"

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor(private http: HttpClient) {
  }

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API + "/tasks/")
  }
}
