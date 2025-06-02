import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../home_/navbar/navbar.component';
import { GetusersService } from '../../service/getusers.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../../home_/home/home.component';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  imports: [CommonModule, RouterModule, HomeComponent, FormGroup, FormBuilder],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  providers: [GetusersService, IssuebooksService]
})


export class UserComponent {
returnBtn() {
throw new Error('Method not implemented.');
}
  //IssueBook
  books: any[] = [];
  issueBooks: any[] = [];
  returnedBooks: any[] = [];
  userType: string | null = null;
  bookMap: { [key: string]: string } = {};
  issueBooksService: any;
  issuePendingReturns!: issueBook[];
  issueCompletedReturns!: issueBook[];
  userForm!: FormGroup;
  isEditing = false;
  currentUser: any = {};

  constructor(private getIssueService: IssuebooksService, private getUserService: GetusersService, private router: Router) {
    // this.getIssueService.getOrders().subscribe({
    //   next: (res: issueBook[]) => {
    //     this.issuePendingReturns = res.filter((o) => o.status = 'pending');
    //     this.issueCompletedReturns = res.filter((o) => o.status = 'returned');
    //   },
    //   error: () => {
    //     //this.showAlert('No Orders Found');
    //   },
    // });
  }

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
const logInUserId = localStorage.getItem('userId');
    this.getIssueService.getIssuBook().subscribe(
      (issData) => {
        this.issueBooks = issData.filter(book=>book.userId == logInUserId);
        this.issuePendingReturns = issData.filter(book => book.status === 'Issued');
        this.issueCompletedReturns = issData.filter(book => book.status === 'returned');
        console.log("ReturnBook" + this.issueCompletedReturns);
        console.log("IssueBooks" + issData);
      },
      (error) => {
        console.error('Error while feting issue data');
      }
    );
    this.books.forEach(book => {
      this.bookMap[book.bookId] = book.bookTitle;
    })
  }

  logout(): void {
    alert("you are logout");

    localStorage.clear(); // or remove only user-related keys
    this.router.navigate(['/login']);
  }


}
