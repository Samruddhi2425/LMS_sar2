import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  pass: string;
}
export interface Managers {
  mId: number;
  mfirstName: string;
  mlastName: string;
  email: string;
  // pass: string;
  mobileNo: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  issueBookData: any[] = [];
  private wishlistCountSubject = new BehaviorSubject<number>(0); 
  public wishlistCount$ = this.wishlistCountSubject.asObservable();

  private apiUrl = 'https://localhost:7252/api/Users/register';
  private baseUrl = 'https://localhost:7252/api/Users/';
  constructor(private http: HttpClient) { }

  private feedbackUrl = 'https://localhost:7252/api/Users/addFeedback';
  feedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(this.feedbackUrl, feedbackData);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`https://localhost:7252/api/Users/ViewbyId/${userId}`);
  }

  private managerUrl = 'https://localhost:7252/api/Managers/';
  registerManager(managerData: any): Observable<any> {
    return this.http.post<any>(this.managerUrl + "register", managerData);
  }

  registerManagerByAdmin(managerData: any): Observable<any> {
    return this.http.post<any>(this.managerUrl + "registerByAdmin", managerData);
  }

  getManagers(): Observable<any[]> {
    return this.http.get<any[]>(this.managerUrl + "get");
  }


  getUnAuthorizedManager(): Observable<Managers[]> {
    return this.http.get<Managers[]>(this.managerUrl + "getUnAuthorizedManager");
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

  checkManagerEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`https://localhost:7252/api/Managers/email-exists?email=${email}`);
  }

  checkEmailExistsfor(email: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`https://localhost:7252/api/Users/check-email?email=${email}`)
      .pipe(map(res => res.exists));
  }

  getAuthorizedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "getUnauthorized");
  }

  updateAuthorizationStatus(mId: number): Observable<void> {
    return this.http.put<void>(`${this.managerUrl}authorized/${mId}`, {});
  }

  deleteRequestedUser(userId: number) {
    return this.http.delete(`${this.baseUrl}deleteRequestedUser/${userId}`);
  }
  addToWishlist(userId: number, bookId: number[]) {
    return this.http.post(`${this.baseUrl}addToWishlist`, {
      userId,
      bookId,
      addedDate: new Date()
    });
  }

  getWishlist(userId: number) {
    return this.http.get<any[]>(`${this.baseUrl}getWishlist/${userId}`);
  }


  updateWishlistCount(userId: number) {
    this.getWishlist(userId).subscribe({
      next: (wishlist) => this.wishlistCountSubject.next(wishlist.length),
      error: () => this.wishlistCountSubject.next(0)
    });
  }

  deleteWishlistBook(wishlistId: number): Observable<any> {
    return this.http.delete(`https://localhost:7252/api/Users/deleteWishlist/${wishlistId}`);
  }

  updateManagerPassword(mId: number, newPass: string): Observable<any> {
    const payload = { newPass };

    return this.http.put<any>(
      `${this.managerUrl}updatePassword/${mId}`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  updateUserPassword(userId: number, newPass: string): Observable<any> {
    const payload = { newPass };

    return this.http.put<any>(
      `${this.managerUrl}updatePassword/${userId}`,
      payload,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
