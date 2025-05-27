import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  issueBookData: any[]=[];
private apiUrl = 'https://localhost:7252/api/Users/register';
  constructor(private http: HttpClient) { }
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
