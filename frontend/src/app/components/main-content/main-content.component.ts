import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit{
  tasks: Task[] = [];

  constructor(
    private _taskService: TaskService
  ) { }

  ngOnInit(): void {
      this._taskService.getTasks().subscribe((data) => {
        this.tasks = data;
      });
  }
}
