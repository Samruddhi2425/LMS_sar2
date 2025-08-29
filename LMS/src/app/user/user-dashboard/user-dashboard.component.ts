import { Component } from '@angular/core';
import { issueBook } from '../user/user.component';
import { GetbooksService } from '../../service/getbooks.service';
import { GetusersService } from '../../service/getusers.service';
import { IssuebooksService } from '../../service/issuebooks.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  totalBooks!: number;
  totalUser!: number;
  IssueBooks: any[] = [];
  totalIssueBooks!: number;
  totalReturnBooks!: number;
  issuePendingReturns!: issueBook[];
  issueCompletedReturns!: issueBook[];
  userType: string | null = null;
  issueBooks: any[] = [];

  constructor(
    private getBooksService: GetbooksService,
    private issueBooksService: IssuebooksService,
    private getUsersService: GetusersService) {
    getUsersService.getUsers().subscribe({
      next: (res: any[]) => {
        this.totalUser = res.length;
      }
    });

    getBooksService.getBooks().subscribe({
      next: (res: any[]) => {
        this.totalBooks = res.length;
      }
    });

    issueBooksService.getIssuBook().subscribe({
      next: (res: any) => {
        this.IssueBooks = res.length;
      }
    });
  }
  ngOnInit(): void {

    this.userType = localStorage.getItem('userType');
    const logInUserId = localStorage.getItem('userId');
    console.log("logInUserId:" + logInUserId)
    if (!logInUserId) {
      console.error('No userId found in localStorage');
      return;
    }
    
    this.issueBooksService.getIssuBook().subscribe(
      (issData) => {
        if (!Array.isArray(issData)) {
          console.error('Invalid data received:', issData);
          return;
        }

        // Filter books for this user
        const userBooks = issData.filter(book => book.userId == logInUserId);

        this.issueBooks = userBooks;
        this.issuePendingReturns = userBooks.filter(book => book.status === 'Issued');
        this.issueCompletedReturns = userBooks.filter(book => book.status === 'returned');
        this.totalIssueBooks = this.issuePendingReturns.length;

        console.log("Returned Books:", this.issueCompletedReturns);
        console.log("All User Issue Books:", this.issueBooks);
      },
      (error) => {
        console.error('Error while fetching issue data:', error);
      }
    );
    
  }
}
