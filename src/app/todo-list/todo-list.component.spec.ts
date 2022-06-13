import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { Todo } from '../todo';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todo: Todo;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    todo = new Todo({
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
