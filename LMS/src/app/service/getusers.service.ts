import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GetusersService {

  private baseUrl="https://localhost:7252/api/Users";

  constructor(private http : HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+"/allusers");
  }


  uploadUser(userData:any):Observable<any[]>{
    return this.http.post<any[]>(this.baseUrl + "/register", userData);
    
  }

  userBlock(userId:number):Observable<any[]>{
    return this.http.put<any[]>(`https://localhost:7252/api/Users/block/${userId}`,{});
  }
  userUnBlock(userId: number):Observable<any[]>{
    return this.http.put<any[]>(`https://localhost:7252/api/Users/unblock/${userId}`, {});

  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7252/api/Users/ViewbyId/${userId}`);
  }
  updateUser(userData: any):Observable<any>{
    return this.http.put<any>(`https://localhost:7252/api/Users/update`, userData);
  }
}
