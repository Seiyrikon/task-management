import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Task } from '../../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8000/api';
  private taskAddedSubject = new Subject<Task>();

  constructor(
    private _http: HttpClient
  ) { }

  //get all task
  getAllTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this.baseUrl+'/all-task');
  }

  getTaskById(taskId: number): Observable<Task> {
    return this._http.get<Task>(`${this.baseUrl}/task/${taskId}`);
  }

  addNewTask(newTask: Task, priorityId: number): Observable<Task> {
    newTask.priority_id = priorityId
    return this._http.post<Task>(`${this.baseUrl}/new-task/${priorityId}`, newTask);
  }

  editTask(modifiedTask: Task, taskId: number, priorityId:number): Observable<Task> {
    return this._http.put<Task>(`${this.baseUrl}/update-task/${taskId}/${priorityId}`, modifiedTask);
  }

  archiveTask(archivedTask:any, taskId: number): Observable<Task> {
    return this._http.put<Task>(`${this.baseUrl}/archive-task/${taskId}`, archivedTask);
  }

}
