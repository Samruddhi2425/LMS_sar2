import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetbooksService {
  private apiUrl="https://localhost:7252/api/Books/ViewAllBooks";
  constructor(private http : HttpClient) { }

  getBooks(): Observable<any[]> { 
    return this.http.get<any[]>(this.apiUrl);
  }

  private uploadUrl="https://localhost:7252/api/Books/AddBook";
  uploadBook(bookData:any):Observable<any[]>{
    return this.http.post<any[]>(this.uploadUrl, bookData);
  }
  //private uploadUrl="https://localhost:7252/api/Books/AddBook";
  getBookById(bookId: any):Observable<any[]>{
  return this.http.get<any[]>('https://localhost:7252/api/Books/${bookId}');
  }
  updateBookData(bookData: any):Observable<any[]>{
  return this.http.put<any[]>('https://localhost:7252/api/Books/update/${bookData.bookId}', bookData);
   }
 
}
