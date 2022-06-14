import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { Task } from '../task';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todo: Task;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    todo = new Task({
      id: '4b3697ed-36f1-4269-897e-1aee6b092df5',
      text: 'Write tests for Angular components',
      completed: false,
    });
    component.todos = [todo];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
