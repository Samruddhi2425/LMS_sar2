import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GetusersService {

  private baseUrl="https://localhost:7252/api/Users"
  private apiUrl="https://localhost:7252/api/Books/ViewAllBooks";
  constructor(private http : HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/allusers");
  }

  private uploadUrl="https://localhost:7252/api/Books/AddBook";
  uploadUser(userData:any):Observable<any[]>{
    return this.http.post<any[]>(this.baseUrl + "/register", userData);
  }
}
