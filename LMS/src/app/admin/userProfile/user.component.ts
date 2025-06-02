import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../home_/navbar/navbar.component';
import { GetusersService } from '../../service/getusers.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../../home_/home/home.component';
import { BookItem } from '../../card.service';
import { GetbooksService } from '../../service/getbooks.service';

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
returnBtn() {
throw new Error('Method not implemented.');
}
  //IssueBook
  books: BookItem[] = [];
  issueBooks: any[] = [];
  returnedBooks: any[] = [];
  userType: string | null = null;
  bookMap: { [key: string]: string } = {};
  issueBooksService: any;
  issuePendingReturns!: issueBook[];
  issueCompletedReturns!: issueBook[];

  constructor(private getIssueService: IssuebooksService, private router: Router, private GetbooksService: GetbooksService) { 
    
  }

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
    this.getIssueService.getIssuBook().subscribe(
      (issData) => {
        this.issueBooks = issData;
        this.issuePendingReturns = issData.filter(book => book.status === 'Issued');
        this.issueCompletedReturns = issData.filter(book => book.status === 'returned');
        console.log("ReturnBook"+this.issueCompletedReturns);
        console.log("IssueBooks"+JSON.stringify( issData));
      },
      (error) => {
        console.error('Error while feting issue data');
      }
    );
    
    this.GetbooksService.getBooks().subscribe(
      (issData) => {
        this.books=issData;
    this.books.forEach(book => {
      this.bookMap[book.bookId] = book.bookName;
      
    });
  })
  }

  returnBook(issueId: number): void {
  this.getIssueService.returnBook(issueId).subscribe({
    next: () => {
      this.router.navigate([this.router.url])
      .then(()=>{window.location.reload();});
      alert('Book returned successfully!');
      
      // this.loadIssuedBooks(); // refresh list if needed
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





