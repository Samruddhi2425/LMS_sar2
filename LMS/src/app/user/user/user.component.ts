import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../home_/navbar/navbar.component';
import { GetusersService } from '../../service/getusers.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from '../../home_/home/home.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Users } from '../../admin/view-user/view-user.component';
import { GetbooksService } from '../../service/getbooks.service';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';

export interface issueBook {
  issueId: number,
  userId: number,
  bookId: number,
  issueDate: string,
  dueDate: string,
  returnDate: string,
  status: string,
  fine: number
}

@Component({
  selector: 'app-user',
  imports: [RouterOutlet, UserSidebarComponent ,HomeComponent,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: []
})


export class UserComponent implements OnInit{
  cartCount = 0;

  ngOnInit(): void {
    const cartCount: number = 0;

    const stored = localStorage.getItem('selectedBookId');
    if (stored) {
      const bookIds = JSON.parse(stored); // Assuming it's an array
      this.cartCount = bookIds.length;
      console.log("cartcount:" + cartCount);
    }
  }
  


}
// function enableEdit() {
//   throw new Error('Function not implemented.');
// }

// function cancelEdit() {
//   throw new Error('Function not implemented.');
// }

// function updateUser() {
//   throw new Error('Function not implemented.');
// }

// function returnBook(issueId: any, number: any) {
//   throw new Error('Function not implemented.');
// }

// function logout() {
//   throw new Error('Function not implemented.');
// }


