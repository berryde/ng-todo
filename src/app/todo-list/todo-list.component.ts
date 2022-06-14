import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';
import { TaskDataService } from '../task-data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  @Input()
  tasks: Task[] = [];

  constructor(private taskDataService: TaskDataService) {}

  ngOnInit(): void {
    this.taskDataService.tasks.subscribe((tasks) => (this.tasks = tasks));
  }

  onToggle(task: Task) {
    this.taskDataService.toggleTask(task);
  }

  onDelete(task: Task) {
    this.taskDataService.deleteTask(task);
  }
}
