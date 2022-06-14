import { Component, OnInit } from '@angular/core';
import { TaskHttpService } from './task-http.service';
import { Task } from './task';
import { TaskDataService } from './task-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-todo';

  constructor() {}

  public ngOnInit() {}
}
