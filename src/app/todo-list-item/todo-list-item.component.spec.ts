import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListItemComponent } from './todo-list-item.component';
import { Task } from '../task';
import { By } from '@angular/platform-browser';

describe('TodoListItemComponent', () => {
  let component: TodoListItemComponent;
  let fixture: ComponentFixture<TodoListItemComponent>;

  beforeEach(async () => {
    const todoMock = new Task({
      id: '71e135c3-d269-4019-9e13-c53d20cfe355',
      text: 'Write tests for spring boot application',
      completed: false,
    });

    await TestBed.configureTestingModule({
      declarations: [TodoListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListItemComponent);
    component = fixture.componentInstance;
    component.todo = todoMock;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('title', () => {
    it('should display the task text', () => {
      const text = fixture.debugElement.query(By.css('p'));
      const textEl = text.nativeElement;
      expect(textEl.textContent).toContain(component.todo.text);
    });
    it('should not have the line-through class when incomplete', () => {
      const text = fixture.debugElement.query(By.css('p'));
      const textEl = text.nativeElement;

      expect(textEl).not.toHaveClass('line-through');
    });
    it('should have the line-through class when completed', () => {
      component.todo = new Task({
        completed: true,
        id: '71e135c3-d269-4019-9e13-c53d20cfe355',
        text: 'Buy groceries',
      });
      fixture.detectChanges();

      const text = fixture.debugElement.query(By.css('p'));
      const textEl = text.nativeElement;
      expect(textEl.classList).toContain('line-through');
    });
  });

  describe('onToggle', () => {
    it('should be called when the checkbox is clicked', () => {
      let selected: Task | undefined;
      component.toggleEmitter.subscribe((todo) => (selected = todo));
      const checkbox = fixture.debugElement.query(By.css('input'));
      checkbox.triggerEventHandler('click');
      expect(selected).toBe(component.todo);
    });
  });

  describe('onDelete', () => {
    it('should be called when the delete button is clicked', () => {
      let deleted: Task | undefined;
      component.deleteEmitter.subscribe((todo) => (deleted = todo));
      const deleteBtn = fixture.debugElement.query(By.css('button'));

      deleteBtn.triggerEventHandler('click');
      expect(deleted).toBe(component.todo);
    });
  });
});
