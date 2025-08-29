import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardService } from '../../card.service';
import { BookItem } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { IssuebooksService } from '../../service/issuebooks.service';
import { UserService } from '../../service/user.service';


interface WishlistBookItem extends BookItem {
  wishlistId: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  wishlistBooks: WishlistBookItem[] = [];// ✅ Displayed books
  selectedBooks: BookItem[] = [];
  loading: boolean = false;

  constructor(
    private cartService: CardService,
    private issueBookService: IssuebooksService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadWishlist();
    
  }

  onCheckboxChange(event: any, book: BookItem): void {
    const isChecked = event.target.checked;
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please log in first.');
      event.target.checked = false;
      return;
    }

    if (isChecked) {
      if (!this.selectedBooks.some(b => b.bookId === book.bookId)) {
        this.selectedBooks.push(book);
      }
    } else {
      this.selectedBooks = this.selectedBooks.filter(b => b.bookId !== book.bookId);
    }
  }

  issueSelectedBook(): void {
    const userId = localStorage.getItem('userId');
    if (!userId || this.selectedBooks.length === 0) {
      alert('Please select at least one book and ensure you are logged in.');
      return;
    }

    this.loading = true;
    this.issueBooksSequentially([...this.selectedBooks], parseInt(userId, 10));
  }

  issueBooksSequentially(books: BookItem[], userId: number): void {
    let successCount = 0;
    let failCount = 0;
    const successfullyIssuedBookIds: number[] = [];

    const processNext = () => {
      if (books.length === 0) {
        // ✅ Remove issued books from wishlistBooks
        this.wishlistBooks = this.wishlistBooks.filter(
          item => !successfullyIssuedBookIds.includes(Number(item.bookId))
        );

        this.selectedBooks = [];
        this.loading = false;
        this.cdr.detectChanges();

        if (failCount > 0 && successCount > 0) {
          alert(`${successCount} book(s) issued. ${failCount} failed. Check console.`);
        } else if (failCount > 0) {
          alert('All selected books failed to issue.');
        } else {
          this.userService.updateWishlistCount(userId);
          alert('All selected books have been issued successfully!');
        }

        return;
      }

      const book = books.shift()!;
      const issueData = {
        userId,
        bookId: Number(book.bookId),
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: this.getDueDate(7),
        bookQty: 1,
        status: 'Issued'
      };

      this.issueBookService.issueBook(issueData).subscribe({
        next: () => {
          successCount++;
          successfullyIssuedBookIds.push(Number(book.bookId));

          // ✅ Remove from DB wishlist if present
          const wishlistItem = this.wishlistBooks.find(
            item => Number(item.bookId) === Number(book.bookId)
          );
          
          if (wishlistItem) {
            this.userService.deleteWishlistBook(wishlistItem.wishlistId).subscribe({
              error: err => console.error(`Error removing from wishlist: ${book.bookName}`, err)
            });
          }
           
          processNext();
        },
        error: err => {
          failCount++;
          console.error(`❌ Failed to issue book: ${book.bookName}`, err);
          processNext();
        }
      });
    };

    processNext();
  }

  getDueDate(daysAhead: number): string {
    const due = new Date();
    due.setDate(due.getDate() + daysAhead);
    return due.toISOString().split('T')[0];
  }

  
  deleteBookFromWishlist(wishlistId: number): void {
    if (confirm('Are you sure you want to remove this book from wishlist?')) {
      this.userService.deleteWishlistBook(wishlistId).subscribe({
        next: () => {
          alert('Book removed from wishlist!');
          this.loadWishlist();
        },
        error: err => {
          console.error('Error deleting wishlist book:', err);
          alert('Failed to remove the book from wishlist.');
        }
      });
    }
  }

  loadWishlist(): void {
    const userId = Number(localStorage.getItem('userId'));
    if (userId) {
      this.userService.getWishlist(userId).subscribe({
        next: books => {
          this.wishlistBooks = books.map((item: any) => ({
            ...item,
            bookId: Number(item.bookId),
            wishlistId: Number(item.wishlistId) // ✅ now ensured
          }));
          this.userService.updateWishlistCount(userId);
        },
        error: err => {
          console.error('Error loading wishlist:', err);
        }
      });
    }
  }
}
