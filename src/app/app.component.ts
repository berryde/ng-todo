import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  title = 'ng-todo';

  constructor(private todoService: TodoService) {}

  public ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.todoService.getAll().subscribe((todos) => (this.todos = todos));
  }

  toggleTask(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.update(todo).subscribe();
  }

  deleteTask(todo: Todo) {
    const id = todo.id;
    if (!id) return;
    this.todoService.delete(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }

  addTask(todo: Todo) {
    this.todoService.add(todo).subscribe((todo) => this.todos.push(todo));
    //this.refresh();
  }
}
