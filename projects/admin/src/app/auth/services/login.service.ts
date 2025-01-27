import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(model: login) {
    return this.http.post(
      environment.baseUrl.replace('tasks', 'auth') + 'login',
      model
    );
  }
}
