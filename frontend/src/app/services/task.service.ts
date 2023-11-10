import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TaskInput, TaskOutput } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8000/api';
  private taskAddedSubject = new Subject<TaskOutput>();

  constructor(
    private _http: HttpClient
  ) { }

  //get all task
  getAllTasks(): Observable<TaskOutput[]> {
    return this._http.get<TaskOutput[]>(this.baseUrl+'/all-task');
  }

  addNewTask(newTask: TaskOutput): Observable<TaskOutput> {
    return this._http.post<TaskOutput>(`${this.baseUrl}/new-task`, newTask);
  }

  getTaskAddedSubject(): Observable<TaskOutput> {
    return this.taskAddedSubject.asObservable();
  }

  notifyTaskAdded(newTask: TaskOutput) {
    this.taskAddedSubject.next(newTask);
  }
}
