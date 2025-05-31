import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../home_/navbar/navbar.component';
import { GetusersService } from '../../service/getusers.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../../home_/home/home.component';

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
  imports: [CommonModule, RouterModule, HomeComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})


export class UserComponent {
  //IssueBook
  books: any[] = [];
  issueBooks: any[] = [];
  returnedBooks: any[] = [];
  userType: string | null = null;
  bookMap: { [key: string]: string } = {};
  issueBooksService: any;
  issuePendingReturns!: issueBook[];
  issueCompletedReturns!: issueBook[];

  constructor(private getIssueService: IssuebooksService, private router: Router) { 
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
    this.getIssueService.getIssuBook().subscribe(
      (issData) => {
        this.issueBooks = issData;
        this.issuePendingReturns = issData.filter(book => book.status === 'Issued');
        this.issueCompletedReturns = issData.filter(book => book.status === 'returned');
        console.log("ReturnBook"+this.issueCompletedReturns);
        console.log("IssueBooks"+issData);
      },
      (error) => {
        console.error('Error while feting issue data');
      }
    );
    this.books.forEach(book => {
      this.bookMap[book.bookId] = book.bookTitle;
    })
  }

  returnBook(issueId: number): void {
  this.getIssueService.returnBook(issueId).subscribe({
    next: () => {
      alert('Book returned successfully!');
      //this.router.navigate(['/userProfile'])
      //this.loadIssuedBooks(); // refresh list if needed
    },
    error: (err) => {
      console.error(err);
      alert('Failed to return book.');
    }
  });
}


  logout(): void {
    alert("you are logout");

    localStorage.clear(); // or remove only user-related keys
    this.router.navigate(['/login']);
  }

}





