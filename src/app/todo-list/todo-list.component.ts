import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  @Input()
  todos: Todo[] = [];

  @Output()
  toggleEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  deleteEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {}

  onToggle(todo: Todo) {
    this.toggleEmitter.emit(todo);
  }

  onDelete(todo: Todo) {
    this.deleteEmitter.emit(todo);
  }
}
