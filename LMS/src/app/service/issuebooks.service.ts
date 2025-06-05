import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { issueBooks } from '../admin/view-user/view-user.component';

export interface IssueBookData{
  issueId: number,
  userId: number,
  bookId: number,
  issueDate: Date,
  dueDate: Date,
  returnDate: Date,
  quantity: number,
  status:string,
  userName:string,
  fine: string
}

@Injectable({
  providedIn: 'root'
})
export class IssuebooksService {
  private baseUrl = "https://localhost:7252/api/IssueBook";

  private apiUrl = 'https://localhost:7252/api/IssueBook/AddIssuBook';

  constructor(private http : HttpClient) { }

  issueBookData :any[]=[]

  getIssuBook(): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"/ViewAllIssueBook");
  }

  addIssBook(IssueData:any): Observable<any[]>{
    return this.http.post<any[]>(this.baseUrl+"/AddIssuBook", IssueData);
  }

  issueBookByUser(userId:number):Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + `/IssueBookById/${userId}`)
  }


  issueBook(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  // issueBookByUser(userId:number):number{
  //   return this.issueBookData.filter(issue => issue.userId === userId).length;
  // }

  returnBook(issueId: number) {
  return this.http.put(this.baseUrl+`/returnBook/${issueId}`,null);
}


 
  getOrders() {
    return this.http.get<any>(this.baseUrl + `/getIssueBooks/userId`).pipe(
      map((orders) => {
        let newOrders = orders.map((order: any) => {
          let newOrder: issueBooks = {
            issueId: order.issueId,
            userId: order.userId,
            userName: order.user.firstName + ' ' + order.user.lastName,
            bookId: order.bookId,
            issueDate: order.orderDate,
            // returned: order.returned,
            returnDate: order.returnDate,
            finePaid: order.finePaid,
            bookTitle: '',
            status: ''
          };
          return newOrder;
        });
        return newOrders;
      })
    );
  }

}