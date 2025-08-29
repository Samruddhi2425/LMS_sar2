import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-profile',
  imports: [RouterModule,CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent implements OnInit {
  userType: string | null = null;
  manager: any[] = [];
  currentUser: any = {};
  isEditing = false;

  constructor(private getUserService: UserService) { }

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
    const logInUserId = localStorage.getItem('mId');
    console.log("logInUserId:" + logInUserId)
    if (!logInUserId) {
      console.error('No userId found in localStorage');
      return;
    }

    if (logInUserId) {
      const mId = Number(logInUserId);  // Convert to number

      this.getUserService.getManagerById(mId).subscribe(
        (manager) => {
          this.currentUser = manager;
          console.log('User loaded:', manager);
        },
        (error) => {
          if (error.status === 404) {
            console.error('User not found');
          } else {
            console.error('Error fetching user:', error);
          }
        }
      );
    }
  }

  enableEdit(): void {
    this.isEditing = true;

  }
  cancelEdit(): void {
    this.isEditing = false;
    this.ngOnInit(); //for reset current data
  }
  
  updateUser(): void {
    this.getUserService.updateManager(this.currentUser).subscribe({
      next: () => {
        alert("Profile updated successfully!");
        this.isEditing = false;
      },
      error: () => {
        alert("Failed to update profile.");
      }
    });
  }
}
