import { Component } from '@angular/core';
import { GetusersService } from '../../service/getusers.service';
import { CommonModule } from '@angular/common';
import { issueBook, UserComponent } from '../userProfile/user.component';
import { IssuebooksService } from '../../service/issuebooks.service';

export interface Users {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
  mobileNo: string;
}

export interface issueBooks {
  issueId: number;
  userId: number;
  userName: string | null;
  bookId: number;
  bookTitle: string;
  issueDate: string;
  status: string;
  returnDate: string;
  finePaid: number;
}

@Component({
  selector: 'app-view-user',
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  users: any[] = [];
  issueBooks: any[] = [];
  issueCount!: number;
  userId!: number;
  issueBooksService: any;
  issuePendingReturns!: issueBook[];
  issueCompletedReturns!: issueBook[];

  issueBookMap: { [key: string]: string } = {};

  constructor(private getUserService: GetusersService, private issuebooksService: IssuebooksService) {
    
  }


  ngOnInit(): void {
    this.getUserService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );

    this.issuebooksService.getIssuBook().subscribe(
      (issData) => {
        if (!Array.isArray(issData)) {
          console.error('Invalid data received:', issData);
          return;
        }

        // Filter books for this user
        const userBooks = issData.filter(book => book.userId == this.userId);

        this.issueBooks = userBooks;
        this.issuePendingReturns = userBooks.filter(book => book.status === 'Issued');
        this.issueCompletedReturns = userBooks.filter(book => book.status === 'returned');
        this.issueCount= this.issuePendingReturns.length;
        console.log("Returned Books:", this.issueCompletedReturns);
        console.log("All User Issue Books:", this.issueBooks);
      },
      (error) => {
        console.error('Error while fetching issue data:', error);
      }
    );

    //this.issueCount = this.issueBooksService.issueBookByUser(this.userId);

    // this.issueBooksService.issueBookByUser(this.userId).subscribe(data => {
    //   this.issueCount = data.length;
    // });
  }

  loadUser(){
    this.getUserService.getUsers().subscribe((data: any[])=>{
     this.users = data;
  });
  }

  blockUser(userId: number){
    this.getUserService.userBlock(userId).subscribe(() =>{
       alert("User blocked Successfully.");
      this.loadUser();

    },
    error => {
    alert("Failed to block user.");
    console.error(error);
    });
    
  }

  UnblockUser(userId: number){
    this.getUserService.userUnBlock(userId).subscribe(()=>{
       alert("User Unblocked Successfully.");
      this.loadUser();
    },
       error => {
    alert("Failed to block user.");
    console.error(error);
    })
  }
}
