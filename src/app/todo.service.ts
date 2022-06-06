import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';

const API = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API + '/tasks/');
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(API + '/tasks/' + id);
  }

  public update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(API + '/tasks/' + todo.id, todo);
  }

  public get(id: string): Observable<Todo> {
    return this.http.get<Todo>(API + '/tasks/' + id);
  }

  public add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(API + '/tasks/', todo);
  }
}
