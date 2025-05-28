import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  issueBookData: any[] = [];
  private apiUrl = 'https://localhost:7252/api/Users/register';
  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  private managerUrl = 'https://localhost:7252/api/Managers/';
  registerManager(managerData: any): Observable<any> {
    return this.http.post<any>(this.managerUrl + "register", managerData);
  }

  getManagers(): Observable<any[]> {
    return this.http.get<any[]>(this.managerUrl + "get");
  }

  updateManager(manager: any): Observable<any[]> {
    return this.http.put<any>(this.managerUrl + `update/${manager.mId}`, manager);
  }

  getManagerById(mId: any): Observable<any[]> {
    console.log(mId);
    return this.http.get<any[]>(this.managerUrl + `getById/${mId}`);
  }

  deleteManager(mId:number):Observable<any>{
    return this.http.delete(this.managerUrl+`delete/${mId}`);
  }

}
