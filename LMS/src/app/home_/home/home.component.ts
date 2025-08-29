import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GetbooksService } from '../../service/getbooks.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { LoginComponent } from '../../login/login.component';
import { CardService } from '../../card.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { UserService } from '../../service/user.service';

declare var bootstrap: any;

export interface BookItem {
  authorName: string;
  base64Image: string;
  bookId: string;
  bookName: string;
  genre: string;
  isbn: string;
  quantity: string;
};

// ... (imports remain unchanged)

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, CommonModule, FormsModule, RouterModule, CartComponent, LoginComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [GetbooksService, CardService]
})
export class HomeComponent implements OnInit, AfterViewInit {
  feedbackForm!: FormGroup;
  books: any[] = [];
  searchTerm: string = '';
  selectedCategory: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 12;
  paginatedBooks: any[] = [];
  num1!: number;
  num2!: number;
  popularBooks: any[] = [];
  chunkedBooks: any;
  topBooks: any[] = [];
  recommendedBooks: any[] = [];
  allBooks: any[] = [];
  totalPages: number = 0;
  totalRecords: number = 0;
  popularBooksChunks: any[][] = [];
  topBooksChunks: any[][] = [];
  likebook: any[] = [];
  Likedbook: any[] = [];
  recentBooks: any[][] = [];
  loading: boolean = false;

  constructor(
    private getBookService: GetbooksService,
    private cardService: CardService,
    private router: Router,
    private issueBookService: IssuebooksService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.setupFeedbackForm();
    this.generateCaptcha();
    this.getRecentBooks();
    this.loadPopularBooks();
    this.loadTopBooks();
    this.loadMostLikedBooks();
    this.loadInitialBooks();
  }

  ngAfterViewInit(): void {
    this.initCarousels();
  }

  private loadInitialBooks(): void {
    const userId = Number(localStorage.getItem('userId'));

    if (userId && this.currentPage === 1) {
      this.getBookService.getRecommendedBooks(userId, this.searchTerm).subscribe({
        next: (recommended) => {
          this.recommendedBooks = recommended || [];
          const excludeIds = this.recommendedBooks.map(b => b.bookId);
          this.fetchPagedBooks(userId, excludeIds);
        },
        error: (error) => {
          console.error('Error loading recommended books:', error);
          this.fetchPagedBooks(userId);
        }
      });
    } else {
      this.fetchPagedBooks(userId || null);
    }
  }

  fetchPagedBooks(userId: number | null, excludeIds: number[] = []): void {
    this.getBookService.getBooksPaged(
      this.currentPage,
      this.itemsPerPage,
      excludeIds,
      this.searchTerm,
      userId
    ).subscribe({
      next: (res) => {
        const remainingSlots = this.itemsPerPage - this.recommendedBooks.length;
        const booksToShow = res.data.slice(0, remainingSlots);
        this.paginatedBooks = [...this.recommendedBooks, ...booksToShow];
        const totalCount = (this.recommendedBooks.length || 0) + res.totalRecords;
        this.totalPages = Math.max(1, Math.ceil(totalCount / this.itemsPerPage));
      },
      error: (err) => {
        console.error('Error fetching paginated books:', err);
      }
    });
  }

  loadBooksWithoutRecommendations(): void {
    const userId = Number(localStorage.getItem('userId')) || null;
    this.fetchPagedBooks(userId);
  }

  addToCart(book: any): void {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('To add Book into the wishlist You have login as user');
      this.router.navigate(['/login']);
      return;
    }

    this.cardService.addToCart(book);

    this.userService.addToWishlist(userId, [book.bookId]).subscribe({
      next: () => {
        alert("Book added to wishlist ❤️");
        this.userService.updateWishlistCount(userId);
        book.isInWishlist = true;
      },
      error: (err) => {
        console.error("Error adding to wishlist:", err);
      }
    });
  }

 issueSelectedBook(book: any): void {
  const userId = Number(localStorage.getItem('userId'));
  const role = localStorage.getItem('role');
  const isRegularUser = !!userId && role === 'user';

  if (!isRegularUser) {
    alert('Please log in as a user to issue books.');
    this.router.navigate(['/login']);
    return;
  }

  const issuePayload = {
    userId: userId,
    bookId: book.bookId,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: this.getDueDate(7),
    bookQty: 1,
    status: 'Issued'
  };

  this.loading = true;
  this.issueBookService.issueBook(issuePayload).subscribe({
    next: () => {
      this.loading = false;
      alert('Book issued successfully!');
    },
    error: (err) => {
      this.loading = false;
      console.error('Error issuing book:', err);
      alert('Failed to issue book.');
    }
  });
}


  // --- Feedback, Pagination, Search, Utility ---
  private setupFeedbackForm(): void {
    this.feedbackForm = new FormGroup({
      CName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]+$')]),
      CEmail: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      CMessage: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      captchaAnswer: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    const userAnswer = parseInt(this.feedbackForm.value.captchaAnswer, 10);
    const correctAnswer = this.num1 + this.num2;

    if (userAnswer !== correctAnswer) {
      alert('Incorrect captcha. Try again.');
      this.generateCaptcha();
      this.feedbackForm.patchValue({ captchaAnswer: '' });
      return;
    }

    if (this.feedbackForm.valid) {
      const { CName, CEmail, CMessage } = this.feedbackForm.value;
      this.userService.feedback({ CName, CEmail, CMessage }).subscribe({
        next: () => {
          alert('Feedback submitted successfully!');
          this.feedbackForm.reset();
          this.generateCaptcha();
        },
        error: (err) => {
          console.error('Error submitting feedback:', err);
          alert('Something went wrong while submitting.');
        }
      });
    } else {
      alert('Please fill all required fields.');
    }
  }

  generateCaptcha(): void {
    this.num1 = Math.floor(Math.random() * 10) + 1;
    this.num2 = Math.floor(Math.random() * 10) + 1;
  }

  chunkArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadInitialBooks();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadInitialBooks();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadInitialBooks();
    }
  }

  getTotalPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.currentPage = 1;
      this.loadInitialBooks();
    } else {
      alert('Please enter a search term.');
    }
  }

  onReset(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadInitialBooks();
  }

  private getDueDate(daysFromNow: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }

  private initCarousels(): void {
    ['bookCarousel', 'popularBooksCarousel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        bootstrap.Carousel.getOrCreateInstance(el, { interval: 4000, ride: 'carousel' });
      }
    });
  }

  private getRecentBooks(): void {
    this.getBookService.getRecentBooks().subscribe((data: any[]) => {
      this.recentBooks = this.chunkArray(data, 5);
    });
  }

  private loadPopularBooks(): void {
    this.getBookService.getPopularBooks().subscribe({
      next: (books) => {
        this.popularBooks = books;
        this.popularBooksChunks = this.chunkArray(this.popularBooks, 5);
      },
      error: (err) => console.error('Error fetching popular books', err)
    });
  }

  private loadTopBooks(): void {
    this.getBookService.getPopularBooksByGenre().subscribe({
      next: (books) => {
        this.topBooks = books;
        this.topBooksChunks = this.chunkArray(this.topBooks, 5);
      },
      error: (err) => console.error('Failed to load top books:', err)
    });
  }

  private loadMostLikedBooks(): void {
    this.getBookService.getMostLikedBooks().subscribe({
      next: (res) => {
        this.Likedbook = res;
        this.likebook = res.map((b: any) => b.bookId);
      },
      error: (err) => console.error('Error fetching most liked books:', err)
    });
  }

  selecteItem(book: any): void {
    const b = localStorage.getItem('bookitemnew');
    const bookItems: any[] = b ? JSON.parse(b) : [];
    bookItems.push(book);
    localStorage.setItem('bookitemnew', JSON.stringify(bookItems));
    localStorage.setItem('count', bookItems.length.toString());
  }
}
