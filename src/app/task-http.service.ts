import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskHttpService {
  ROOT_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.ROOT_URL + '/tasks/');
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.ROOT_URL + '/tasks/' + id);
  }

  public update(todo: Task): Observable<Task> {
    return this.http.put<Task>(this.ROOT_URL + '/tasks/' + todo.id, todo);
  }

  public get(id: string): Observable<Task> {
    return this.http.get<Task>(this.ROOT_URL + '/tasks/' + id);
  }

  public add(todo: Task): Observable<Task> {
    return this.http.post<Task>(this.ROOT_URL + '/tasks/', todo);
  }
}
