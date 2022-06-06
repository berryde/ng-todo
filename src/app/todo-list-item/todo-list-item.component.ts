import {Component, Input, OnInit} from '@angular/core';
import {Todo} from "../todo"


@Component({
  selector: 'app-todo-list-item[todo]',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit {

  @Input()
  todo!: Todo;

  constructor() {
  }

  ngOnInit(): void {
  }

}
