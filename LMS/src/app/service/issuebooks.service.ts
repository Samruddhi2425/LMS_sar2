import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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

  // issueBookByUser(userId:number):number{
  //   return this.issueBookData.filter(issue => issue.userId === userId).length;
  // }

  getOrdersOfUser(userId: number) {
    let params = new HttpParams().append('userId', userId);
    return this.http
      .get<any>(this.baseUrl + 'GetOrdersOfUser', {
        params: params,
      })
      .pipe(
        map((orders) => {
          let newOrders = orders.map((order: any) => {
            let newOrder: IssueBookData = {
              issueId: order.issueId,
              userId: order.userId,
              userName: order.user.firstName + ' ' + order.user.lastName,
              bookId: order.bookId,
              //bookTitle: order.book.title,
              issueDate: order.issueDate,
              status: order.status,
              returnDate: order.returnDate,
              fine: order.fine,
            };
            return newOrder;
          });
          return newOrders;
        })
      );
  }

}
