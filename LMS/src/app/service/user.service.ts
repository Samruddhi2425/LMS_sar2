import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  pass: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  issueBookData: any[] = [];
  private apiUrl = 'https://localhost:7252/api/Users/register';
  private baseUrl = 'https://localhost:7252/api/Users/';
  constructor(private http: HttpClient) { }

  private feedbackUrl = 'https://localhost:7252/api/Users/';
  feedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(this.feedbackUrl + "addFeedback", feedbackData);
  }

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

  // updateManager(managerData: any): Observable<any[]> {
  //   return this.http.put<any>(this.managerUrl + `update/${managerData.mId}`, managerData);
  // }

updateManager(manager: any): Observable<any> {
  return this.http.put<any>(`${this.managerUrl}update/${manager.mId}`, manager);
}


  getManagerById(mId: any): Observable<any> {
    console.log(mId);
    
    return this.http.get<any>(this.managerUrl + `getById/${mId}`);
  }

  deleteManager(mId: number): Observable<any> {
    return this.http.delete(this.managerUrl + `delete/${mId}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`https://localhost:7252/api/Users/email-exists?email=${email}`);
  }

  checkEmailExistsfor(email: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`https://localhost:7252/api/Users/check-email?email=${email}`)
      .pipe(map(res => res.exists));
  }

  getAuthorizedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+"getUnauthorized");
  }

  updateAuthorizationStatus(userId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}authorized/${userId}`, {});
  }

  deleteRequestedUser(userId: number) {
  return this.http.delete(`${this.baseUrl}deleteRequestedUser/${userId}`);
}

}
