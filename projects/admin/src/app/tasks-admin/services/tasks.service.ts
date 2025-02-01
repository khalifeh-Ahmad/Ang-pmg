import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { CreateTask } from '../context/DTOs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasks(filter: any) {
    let params = new HttpParams();
    Object.entries(filter).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value);
      }
    });

    return this.http.get(environment.baseUrl + 'all-tasks', { params });
  }
  createTask(model: any) {
    return this.http.post(environment.baseUrl + 'add-task', model);
  }
  updateTask(dataModel: any, id: any) {
    return this.http.put(environment.baseUrl + 'edit-task/' + id, dataModel);
  }

  deleteTask(id: any) {
    return this.http.delete(environment.baseUrl + 'delete-task/' + id);
  }
}
