import { Component, OnInit } from '@angular/core';
import { CardService } from '../../card.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GetusersService } from '../../service/getusers.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule,],
  providers: [CardService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  role: string | null = '';
  isLoggedIn: boolean = false;
  userType: string | null = null;
  myUserType: string | null = null;;
  profileLink: string = '';
  userName: string = '';
  // cartCount: any;
  cartCount = 0;
  wishlistCount: number = 0;

  constructor(private cardService: CardService, private userService: UserService) { }

  ngOnInit(): void {
    // Initialize cart from storage
    this.cardService.initializeCart();

    // Subscribe to cart count changes
    this.userService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });

    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.userService.updateWishlistCount(userId);
    }

    const userType = localStorage.getItem('userType');
    this.myUserType = localStorage.getItem('userType');
    this.isLoggedIn = !!userType;


    if (userType === 'admin') {
      this.profileLink = '/admin';
    } else if (userType === 'manager') {
      this.profileLink = '/manager';
    } else {
      this.profileLink = '/user/userDashboard';
    }

    const cartCount: number = 0;

    const stored = localStorage.getItem('selectedBookId');
    if (stored) {
      const bookIds = JSON.parse(stored); // Assuming it's an array
      this.cartCount = bookIds.length;
      console.log("cartcount:" + cartCount);
    }


  }

  // checkLoginStatus(): void {
  //   this.userType = localStorage.getItem('userType');
  //   this.isLoggedIn = !!this.userType;
  // }

  logout(): void {
    localStorage.clear();
    this.userService.updateWishlistCount(0);
    this.isLoggedIn = false;
    window.location.href = '/login'; // or use router.navigate
  }
  wishlistBooks: any[] = [];

  loadWishlist() {
    const userId = Number(localStorage.getItem('userId'));

    this.userService.getWishlist(userId).subscribe(
      (res) => {
        this.wishlistBooks = res;
        console.log("User Wishlist:", this.wishlistBooks);
      },
      (err) => {
        console.error("Error loading wishlist", err);
      }
    );

  }
}
