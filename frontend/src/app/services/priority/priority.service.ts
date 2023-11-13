import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Priority } from 'src/app/interfaces/priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(
    private _http: HttpClient,
  ) { }

  getAllPriority(): Observable<Priority[]> {
    return this._http.get<Priority[]>(`${this.baseUrl}/all-priority`)
  }
  
}
