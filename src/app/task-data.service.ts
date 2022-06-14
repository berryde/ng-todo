import { Injectable } from '@angular/core';
import { Task } from './task';
import { TaskHttpService } from './task-http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private taskHttpService: TaskHttpService) {
    this.refresh();
  }

  refresh() {
    this.taskHttpService.getAll().subscribe((tasks) => this.tasks.next(tasks));
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.taskHttpService.update(task).subscribe();
  }

  deleteTask(task: Task) {
    const id = task.id;
    if (!id) return;

    this.taskHttpService.delete(id).subscribe(() => {
      this.tasks.next(this.tasks.getValue().filter((task) => task.id !== id));
    });
  }

  addTask(task: Task) {
    this.taskHttpService
      .add(task)
      .subscribe((task) => this.tasks.next([...this.tasks.getValue(), task]));
  }
}
