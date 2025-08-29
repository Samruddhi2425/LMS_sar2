import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GetusersService } from '../../service/getusers.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { issueBook } from '../user/user.component';
import { GetbooksService } from '../../service/getbooks.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../../home_/home/home.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-pending-books',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeComponent, FormsModule],
  templateUrl: './pending-books.component.html',
  styleUrl: './pending-books.component.css'
})
export class PendingBooksComponent implements OnInit {
  books: any[] = [];
  user: any[] = [];
  returnedBooks: any[] = [];
  userType: string | null = null;
  issueBooks: any[] = [];
  bookMap: { [key: string]: string } = {};
  issuePendingReturns: issueBook[] = [];
  issueCompletedReturns: issueBook[] = [];
  userForm!: FormGroup;
  isEditing = false;
  currentUser: any = {};
  errorMessage: string = '';
  selectedIssueId!: number;
selectedRating=0;

  constructor(
    private getIssueService: IssuebooksService,
    private getUserService: GetusersService,
    private router: Router,
    private GetbooksService: GetbooksService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType');
    const logInUserId = localStorage.getItem('userId');
    if (!logInUserId) {
      console.error('No userId found in localStorage');
      return;
    }

    this.loadIssuedBooks(); // ✅ Load pending and returned tables
    this.loadBooks();       // ✅ Load book names
    this.loadUser();        // ✅ Load current user profile
  }

  // ✅ Load Issued Books and Separate into Pending and Returned
  loadIssuedBooks(): void {
    const logInUserId = localStorage.getItem('userId');
    if (!logInUserId) return;

    this.getIssueService.getIssuBook().subscribe(
      (issData) => {
        const userBooks = issData.filter(book => book.userId == logInUserId);
        this.issueBooks = userBooks;
        this.issuePendingReturns = userBooks.filter(book => book.status === 'Issued');
        this.issueCompletedReturns = userBooks.filter(book => book.status === 'returned');
      },
      (error) => {
        console.error('Error while fetching issue data:', error);
      }
    );
  }

  // ✅ Load All Books and Map bookId to bookName
  loadBooks(): void {
    this.GetbooksService.getBooks().subscribe((books) => {
      this.books = books;
      this.books.forEach(book => {
        this.bookMap[book.bookId] = book.bookName || book.bookTitle;
      });
    });
  }

  // ✅ Load Current User Profile
  loadUser(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.getUserService.getUserById(Number(userId)).subscribe(
      (user) => {
        this.currentUser = user;
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

  enableEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.loadUser(); // ✅ Reset form data
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

  // ✅ Return Book without full reload — refresh only both tables
  returnBook(issueId: number): void {
    this.getIssueService.returnBook(issueId).subscribe({
      next: () => {
        alert('Book returned successfully!');
        this.loadIssuedBooks(); // ✅ refresh only data
      },
      error: (err) => {
        console.error(err);
        alert('Failed to return book.');
      }
    });
  }

  logout(): void {
    alert("You are logged out.");
    this.userService.updateWishlistCount(0);
    localStorage.clear();
    this.router.navigate(['/login']);
  }



  send(): void {
    alert("Book is returned");
    // const modalEl = document.getElementById('exampleModal');
    // const bsModal = modalEl ? (window as any).bootstrap.Modal.getInstance(modalEl) : null;
    // bsModal?.hide();
  }

  confirmAndReturn(issueId: number,issue: issueBook): void {
    if (!confirm('Are you sure you want to return this book?')) {
      return;
    }
    this.selectedIssueId = issue.bookId;

    this.getIssueService.returnBook(issueId).subscribe({
      next: () => {
        
        // Open Bootstrap modal on success
        const modalEl = document.getElementById('exampleModal');
        if (modalEl) {
          const myModal = new (window as any).bootstrap.Modal(modalEl);
          myModal.show();
          modalEl.addEventListener('hidden.bs.modal', () => {
          document.body.classList.remove('modal-open');
          document.querySelectorAll('.modal-backdrop')
            .forEach(el => el.remove());
        }, { once: true });
        }
 this.loadIssuedBooks();
  // Cleanup backdrop & body class when modal fully hides
        
        // Optional: refresh list, navigate, etc.
      },
      error: (err) => {
        console.error(err);
        alert('Failed to return book.');
      }
    });
  }

  

  // openReturnModal(issue: issueBook): void {
  //   this.selectedIssueId = issue.bookId;
  // }
  onStarClick(userId: number, bookId: number, value: number) {
    console.log('Rating for bookId:', bookId);
    const req = { userId, bookId, ratings: value };
    console.log('→ Sending rating', req);

    this.GetbooksService.rateBook(req).subscribe({
      next: res => {
        console.log('← Response status:', res, 'body:', res);
        alert('Rating submitted successfully!');
      },
      error: err => {
        console.error('✖ Error submitting rating', err);
        alert('Error: ' + (err.message || err.statusText));
      }
    });
  }


}
