import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IssuebooksService {
  private baseUrl = "https://localhost:7252/api/IssueBook";
  constructor(private http : HttpClient) { }
  getIssuBook(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"/ViewAllIssueBook");
  }

  addIssBook(IssueData:any): Observable<any[]>{
    return this.http.post<any[]>(this.baseUrl+"/AddIssuBook", IssueData);
  }

}
