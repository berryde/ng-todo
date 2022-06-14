import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TaskHttpService } from './task-http.service';
import { Task } from './task';
import { of } from 'rxjs';
import createSpyObj = jasmine.createSpyObj;
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoServiceMock: TaskHttpService;
  let todoMock: Task;

  beforeEach(async () => {
    todoMock = new Task({
      id: '3cd3b283-6d60-4b75-b5d4-765fb46c08c9',
      text: 'Buy a new phone',
      completed: false,
    });

    todoServiceMock = createSpyObj<TaskHttpService>('TodoService', {
      delete: of(null),
      get: of(todoMock),
      add: of(todoMock),
      getAll: of([todoMock]),
      update: of(todoMock),
    });

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TodoFormComponent,
        TodoListComponent,
        TodoListItemComponent,
      ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        {
          provide: TaskHttpService,
          useValue: todoServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'ng-todo'`, () => {
    expect(component.title).toEqual('ng-todo');
  });

  it('should fetch all tasks', () => {
    expect(todoServiceMock.getAll).toHaveBeenCalled();
  });

  describe('toggleTask', () => {
    it('updates an uncompleted task to be completed', () => {
      todoMock.completed = false;
      component.toggleTask(todoMock);
      expect(todoServiceMock.update).toHaveBeenCalledWith(todoMock);
      expect(todoMock.completed).toBe(true);
    }),
      it('updates a completed task to be uncompleted', () => {
        todoMock.completed = true;
        component.toggleTask(todoMock);
        expect(todoServiceMock.update).toHaveBeenCalledWith(todoMock);
        expect(todoMock.completed).toBe(false);
      });
  });

  describe('deleteTask', () => {
    it('should delete the provided task', () => {
      component.deleteTask(todoMock);
      expect(todoServiceMock.delete).toHaveBeenCalledWith(todoMock.id!);
    });
  });

  describe('addTask', () => {
    it('should add the provided task', () => {
      component.addTask(todoMock);
      expect(todoServiceMock.add).toHaveBeenCalledWith(todoMock);
    });
  });
});
