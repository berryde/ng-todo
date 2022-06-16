import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { Task } from '../task';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';
import { TaskDataService } from '../task-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let taskMock: Task;
  let taskDataServiceMock: Partial<TaskDataService>;

  beforeEach(async () => {
    taskMock = new Task({
      id: '4b3697ed-36f1-4269-897e-1aee6b092df5',
      text: 'Write tests for Angular components',
      completed: false,
    });

    taskDataServiceMock = jasmine.createSpyObj<TaskDataService>(
      'TaskDataService',
      ['toggleTask', 'deleteTask', 'getTasks', 'addTask']
    );

    taskDataServiceMock.getTasks = jasmine
      .createSpy()
      .and.returnValue(new BehaviorSubject([taskMock]));

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoListItemComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: TaskDataService, useValue: taskDataServiceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onToggle', () => {
    it('should call taskDataServiceMock.toggleTask', () => {
      component.onToggle(taskMock);
      expect(taskDataServiceMock.toggleTask).toHaveBeenCalledWith(taskMock);
    });
  });

  describe('onDelete', () => {
    it('should delete the provided task', () => {
      component.onDelete(taskMock);
      expect(taskDataServiceMock.deleteTask).toHaveBeenCalledWith(taskMock);
    });
  });
});
