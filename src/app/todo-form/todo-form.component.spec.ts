import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDataService } from '../task-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let taskDataServiceMock: Partial<TaskDataService>;

  beforeEach(async () => {
    taskDataServiceMock = jasmine.createSpyObj<TaskDataService>(
      'TaskDataService',
      ['addTask']
    );

    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [FormsModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: TaskDataService, useValue: taskDataServiceMock },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the form with the provided input', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const inputEl = input.nativeElement;
    const description = 'Go for a swim';

    inputEl.value = description;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.todoForm.value.text).toBe(description);
  });

  describe('onAdd', () => {
    it('should call TaskDataService.create with the provided task description', () => {
      const input = fixture.debugElement.query(By.css('input'));
      const inputEl = input.nativeElement;
      const description = 'Do the gardening';

      inputEl.value = description;
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit');
      fixture.detectChanges();

      expect(taskDataServiceMock.addTask).toHaveBeenCalledWith(description);
    });
  });
});
