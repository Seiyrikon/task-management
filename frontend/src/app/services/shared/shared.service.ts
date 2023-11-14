import { Injectable } from '@angular/core';
import { TaskService } from '../task/task.service';
import { Task } from 'src/app/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class SharedService{

  taskList!: Task[];

  constructor(
    private _taskService: TaskService,
  ) { }

  loadTasks(): void {
    this._taskService.getAllTasks().subscribe(
      (tasks) => this.taskList = tasks
    )
  }
}
