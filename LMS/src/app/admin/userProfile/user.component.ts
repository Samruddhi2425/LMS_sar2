import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../home_/navbar/navbar.component';
import { GetusersService } from '../../service/getusers.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from '../../home_/home/home.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Users } from '../view-user/view-user.component';
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
  imports: [CommonModule, RouterModule, HomeComponent, FormsModule],
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
  user: any[] = [];
  issueBooks: any[] = [];
  returnedBooks: any[] = [];
  userType: string | null = null;
  bookMap: { [key: string]: string } = {};
  issueBooksService: any;
  issuePendingReturns!: issueBook[];
  issueCompletedReturns!: issueBook[];
   userForm!: FormGroup;
  isEditing = false;
  currentUser: any={};
  errorMessage: string = '';

  constructor(private getIssueService: IssuebooksService, private getUserService: GetusersService, private router: Router, private GetbooksService:GetbooksService) {
    
  }

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
    const logInUserId = localStorage.getItem('userId');
console.log("logInUserId:"+logInUserId)
    if (!logInUserId) {
      console.error('No userId found in localStorage');
      return;
    }


    this.getIssueService.getIssuBook().subscribe(
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

        console.log("Returned Books:", this.issueCompletedReturns);
        console.log("All User Issue Books:", this.issueBooks);
      },
      (error) => {
        console.error('Error while fetching issue data:', error);
      }
    );


    // Only map books if they're already loaded
    this.GetbooksService.getBooks().subscribe(
      (issData) => {
        this.books=issData;
    this.books.forEach(book => {
      this.bookMap[book.bookId] = book.bookName;
      
    });
  })



    if (this.books && Array.isArray(this.books)) {
      
      this.books.forEach(book => {
        this.bookMap[book.bookId] = book.bookTitle;
        
      });
    } else {
      console.warn('Books not loaded at ngOnInit');
    }


    
    //  const userId = localStorage.getItem('userId');

    if (logInUserId) {
  const userId = Number(logInUserId);  // Convert to number

  this.getUserService.getUserById(userId).subscribe(
    (user) => {
      this.currentUser = user;
      console.log('User loaded:', user);
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
    this.getUserService.updateUser(this.currentUser).subscribe({
      next: () => {
        alert("Profile updated successfully!");
        this.isEditing = false;
      },
      error: () => {
        alert("Failed to update profile.");
      }
    });
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


