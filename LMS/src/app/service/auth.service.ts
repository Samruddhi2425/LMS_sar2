import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService implements CanActivate{
  constructor(private http: HttpClient, private router: Router) {}

  // login(email: string, pass: string): Observable<any> {
  //   return this.http.post('/api/login', { email, pass });
  // }

  // getRole(): string | null {
  //   return localStorage.getItem('role');
  // }

  // logout() {
  //   localStorage.removeItem('role');
  // }

  login(email: string, password: string): Observable<any> {
  return this.http.post<any>('https://localhost:7252/api/Login/login', {
    email: email,
    password: password
  });
}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['expectedRole'];
    const userType = localStorage.getItem('userType');
    
    if (userType === expectedRole) {
      return true;
    } else {
      // Redirect unauthorized users
      if (userType) {
       // console.log(userType);
        this.router.navigate([`/${userType}`]); // redirect to their dashboard
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }

  private baseUrl = 'http://localhost:3000/api'; // Change to your API


  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/forgot-password`, { email });
  }
}
