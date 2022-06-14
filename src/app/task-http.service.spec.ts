import { TestBed } from '@angular/core/testing';

import { TaskHttpService } from './task-http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Task } from './task';

describe('TodoService', () => {
  let service: TaskHttpService;
  let httpMock: HttpTestingController;
  let taskMock: Task;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TaskHttpService);
    httpMock = TestBed.inject(HttpTestingController);
    taskMock = new Task({
      id: '9add5df4-2c31-4721-b3e2-dc7e67de36f3',
      text: 'Prepare lunch',
      completed: true,
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getAll', () => {
    it('should request to get all tasks', () => {
      service.getAll().subscribe();
      const request = httpMock.expectOne(`${service.ROOT_URL}/tasks/`);
      expect(request.request.method).toBe('GET');
    });
  });
  describe('delete', () => {
    it('should request to delete the task with the provided id', () => {
      const ID = '9add5df4-2c31-4721-b3e2-dc7e67de36f3';
      service.delete(ID).subscribe();
      const request = httpMock.expectOne(`${service.ROOT_URL}/tasks/${ID}`);
      expect(request.request.method).toBe('DELETE');
    });
  });
  describe('update', () => {
    it('should request to update the provided task', () => {
      service.update(taskMock).subscribe();
      const request = httpMock.expectOne(
        `${service.ROOT_URL}/tasks/${taskMock.id!}`
      );
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toBe(taskMock);
    });
  });
  describe('get', () => {
    it('should request to get the task with the provided id', () => {
      service.get(taskMock.id!).subscribe();
      const request = httpMock.expectOne(
        `${service.ROOT_URL}/tasks/${taskMock.id!}`
      );
      expect(request.request.method).toBe('GET');
    });
  });
  describe('add', () => {
    it('should request to add the provided task', () => {
      service.add(taskMock).subscribe();
      const request = httpMock.expectOne(`${service.ROOT_URL}/tasks/`);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(taskMock);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
