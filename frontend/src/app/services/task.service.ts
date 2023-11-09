import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8000/api/all-task';

  constructor(
    private _http: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this.baseUrl);
  }
}
