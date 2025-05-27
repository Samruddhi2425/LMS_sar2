import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, pass: string): Observable<any> {
    return this.http.post('/api/login', { email, pass });
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('role');
  }
}
