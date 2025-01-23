import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks() {
    let headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http.get(environment.baseUrl + 'tasks/all-task2s', {
      headers,
    });
  }
}
