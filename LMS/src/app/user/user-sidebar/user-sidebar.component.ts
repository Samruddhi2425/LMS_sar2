import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-sidebar',
  imports: [RouterModule, FormsModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  constructor(private router: Router,private userService:UserService){}
  isSidebarVisible: boolean = false;

myFunction(): void {
  const x = document.getElementById("myTopnav");

  if (x) {
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}

  logout(): void {
  localStorage.clear();
    this.userService.updateWishlistCount(0);
  localStorage.removeItem('userType');
  this.router.navigate(['/login']);

}
}
