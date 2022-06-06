import {Component, OnInit} from '@angular/core';
import {TodoService} from "./todo.service";
import {Todo} from "./todo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent implements OnInit {

  todos: Todo[] = []
  title = 'ng-todo';

  constructor(private todoService: TodoService) {
  }

  public ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => this.todos = todos)
  }
}
