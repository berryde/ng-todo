import { TestBed } from '@angular/core/testing';

import { TaskDataService } from './task-data.service';
import { Task } from './task';
import { TaskHttpService } from './task-http.service';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskDataService', () => {
  let taskDataService: TaskDataService;
  let taskMock: Task;
  let taskHttpServiceMock: Partial<TaskHttpService>;

  beforeEach(() => {
    taskMock = new Task({
      id: '3cd3b283-6d60-4b75-b5d4-765fb46c08c9',
      text: 'Buy a new phone',
      completed: false,
    });
    taskHttpServiceMock = jasmine.createSpyObj<TaskHttpService>('TodoService', {
      delete: of(null),
      get: of(taskMock),
      add: of(taskMock),
      getAll: of([taskMock]),
      update: of(taskMock),
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: TaskHttpService, useValue: taskHttpServiceMock }],
    });
    taskDataService = TestBed.inject(TaskDataService);
    taskDataService.tasks = new BehaviorSubject<Task[]>([taskMock]);
  });

  it('should be created', () => {
    expect(taskDataService).toBeTruthy();
  });

  describe('toggleTask', () => {
    it('completes an incomplete task', () => {
      taskMock.completed = false;
      taskDataService.toggleTask(taskMock);
      expect(taskMock.completed).toBe(true);
    });
    it('un-completes a completed task', () => {
      taskMock.completed = true;
      taskDataService.toggleTask(taskMock);
      expect(taskMock.completed).toBe(false);
    });
    it('calls taskHttpService.update', () => {
      taskDataService.toggleTask(taskMock);
      expect(taskHttpServiceMock.update).toHaveBeenCalledWith(taskMock);
    });
  });

  describe('deleteTask', () => {
    it('deletes the task', () => {
      expect(taskDataService.tasks.getValue()).toContain(taskMock);
      taskDataService.deleteTask(taskMock);
      expect(taskDataService.tasks.getValue()).not.toContain(taskMock);
    });
    it('calls taskHttpService.delete', () => {
      taskDataService.deleteTask(taskMock);
      expect(taskHttpServiceMock.delete).toHaveBeenCalledWith(taskMock.id!);
    });
  });

  describe('addTask', () => {
    it('adds the task', () => {
      expect(taskDataService.tasks.getValue().length).toBe(1);
      taskDataService.addTask('Go to the beach');
      expect(taskDataService.tasks.getValue().length).toBe(2);
    });
    it('calls taskHttpService.add', () => {
      taskDataService.addTask('Go for a walk');
      expect(taskHttpServiceMock.add).toHaveBeenCalledTimes(1);
    });
  });
});
