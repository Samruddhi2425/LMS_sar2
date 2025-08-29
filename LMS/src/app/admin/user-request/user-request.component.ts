import { Component, OnInit } from '@angular/core';
import { Managers, User, UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-request',
  imports: [CommonModule],
  templateUrl: './user-request.component.html',
  styleUrl: './user-request.component.css'
})
export class UserRequestComponent implements OnInit {
  managers: any[] = [];
  unAuthorizeManagers!: Managers[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUnAuthorizedManager().subscribe(
      (data) => {
        this.managers = data;
        console.log(this.managers)
      },
      (error) => {
        console.error('Error fetching managers', error);
      }
    );
  }

  acceptManager(Id: number): void {

    this.userService.updateAuthorizationStatus(Id).subscribe({
      next: () => {
        // Update the local users array to reflect the change
        const user = this.managers.find(u => u.mId === Id);
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

  deleteManager(Id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteManager(Id).subscribe({
        next: () => {
          this.managers = this.managers.filter(u => u.userId !== Id);
          console.log(Id)
        },
        error: (err) => {
          console.error('Error deleting user', err);
        }
      });
    }
  }


  getAllUserRequests(): void {
  this.userService.getUnAuthorizedManager().subscribe((res) => {
    this.managers = res;
  });
}
}