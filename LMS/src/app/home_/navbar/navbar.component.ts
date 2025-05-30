import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  providers: [CardService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
role: string | null = '';
isLoggedIn: boolean = false;
userType: string | null = null;
profileLink: string = '';
// constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userType = localStorage.getItem('userType');
    this.isLoggedIn = !!userType;

    if (userType === 'admin') {
      this.profileLink = '/admin';
    } else if (userType === 'manager') {
      this.profileLink = '/manager';
    } else {
      this.profileLink = '/userProfile';
    }
  }

  // checkLoginStatus(): void {
  //   this.userType = localStorage.getItem('userType');
  //   this.isLoggedIn = !!this.userType;
  // }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    window.location.href = '/login'; // or use router.navigate
  }
}
