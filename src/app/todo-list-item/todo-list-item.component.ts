import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-todo-list-item[todo]',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
})
export class TodoListItemComponent implements OnInit {
  @Input()
  todo!: Task;

  @Output()
  toggleEmitter: EventEmitter<Task> = new EventEmitter<Task>();

  @Output()
  deleteEmitter: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() {}

  ngOnInit(): void {}

  onToggle() {
    this.toggleEmitter.emit(this.todo);
  }

  onDelete() {
    this.deleteEmitter.emit(this.todo);
  }
}
