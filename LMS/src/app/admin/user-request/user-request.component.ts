import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-request',
  imports: [CommonModule],
  templateUrl: './user-request.component.html',
  styleUrl: './user-request.component.css'
})
export class UserRequestComponent implements OnInit {
  users: any[] = [];
  unAuthorizeUsers!: User[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAuthorizedUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  acceptUser(userId: number): void {

    this.userService.updateAuthorizationStatus(userId).subscribe({
      next: () => {
        // Update the local users array to reflect the change
        const user = this.users.find(u => u.userId === userId);
        if (user) {
          user.isAuthorized = true;
        }
        this.getAllUserRequests();
      },
      error: (err) => {
        console.error('Error updating authorization status', err);
      }
    });    
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteRequestedUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.userId !== userId);
          console.log(userId)
        },
        error: (err) => {
          console.error('Error deleting user', err);
        }
      });
    }
  }


  getAllUserRequests(): void {
  this.userService.getAuthorizedUsers().subscribe((res) => {
    this.users = res;
  });
}
}