import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-item[todo]',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
})
export class TodoListItemComponent implements OnInit {
  @Input()
  todo!: Todo;

  @Output()
  toggleEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  deleteEmitter: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor() {}

  ngOnInit(): void {}

  onToggle() {
    this.toggleEmitter.emit(this.todo);
  }

  onDelete() {
    this.deleteEmitter.emit(this.todo);
  }
}
