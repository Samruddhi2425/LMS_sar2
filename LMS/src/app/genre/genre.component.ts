import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../home_/navbar/navbar.component';
import { BookdescriptionComponent } from '../home_/bookdescription/bookdescription.component';

import { GetbooksService } from '../service/getbooks.service';
import { CardService } from '../card.service';
import { IssuebooksService } from '../service/issuebooks.service';
import { UserService } from '../service/user.service';

interface Books {
  authorName: string;
  base64Image: string;
  bookId: number;
  bookName: string;
  genre: string;
  isbn: string;
  quantity: string;
}

@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    BookdescriptionComponent
  ],
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
  providers: [GetbooksService]
})
export class GenreComponent implements OnInit {
  book: Books[] = [];
  category: any[] = [];
  selectedCategory: number = 0;
  loading: boolean = false;

  constructor(
    private getBookService: GetbooksService,
    private router: Router,
    private cardService: CardService,
    private issueBookService: IssuebooksService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.fetchGenres();
  }

  fetchBooks(): void {
    this.getBookService.getBooks().subscribe({
      next: (data) => this.book = data,
      error: (err) => console.error('Error fetching books:', err)
    });
  }

  fetchGenres(): void {
    this.getBookService.getGenre().subscribe({
      next: (data) => this.category = data,
      error: (err) => console.error('Error fetching genres:', err)
    });
  }

  showAllBooks(): void {
    this.fetchBooks();
  }

  onCategorySelect(genreId: number): void {
    this.selectedCategory = genreId;
    this.getBookService.ViewBookByGenre(genreId).subscribe({
      next: (data) => this.book = data,
      error: (err) => console.error('Error fetching books by genre:', err)
    });
  }

selectItem(book: any): void {
  const existingData = localStorage.getItem('bookitemnew');
  let bookItems: any[] = [];

  if (existingData) {
    try {
      bookItems = JSON.parse(existingData);
    } catch (err) {
      console.error('Failed to parse localStorage:', err);
    }
  }

  bookItems.push(book);
  localStorage.setItem('bookitemnew', JSON.stringify(bookItems));
  localStorage.setItem('count', bookItems.length.toString());
  console.log("Updated count:", bookItems.length);
}

//  addToCart(item: any): void {
//   this.cardService.addToCart(item);
//   alert('Book added to cart successfully!');
// }

addToCart(book: any): void {
    const userId = Number(localStorage.getItem('userId'));
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


  // issueSelectedBook(book: Books): void {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn');
  //   const userId = localStorage.getItem('userId');

  //   if (!isLoggedIn || !userId) {
  //     alert('Please log in to issue books.');
  //     this.router.navigate(['/login']);
  //     return;
  //   }

  //   const issuePayload = {
  //     userId: parseInt(userId, 10),
  //     bookId: book.bookId,
  //     issueDate: this.getTodayDate(),
  //     dueDate: this.getDueDate(7),
  //     bookQty: 1,
  //     status: 'Issued'
  //   };

  //   this.issueBookService.issueBook(issuePayload).subscribe({
  //     next: () => alert('Book issued successfully!'),
  //     error: (err) => {
  //       console.error('Error issuing book:', err);
  //       alert('Failed to issue book.');
  //     }
  //   });
  // }

  issueSelectedBook(book: any): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to issue books.');
      this.router.navigate(['/login']);
      return;
    }

    const issuePayload = {
      userId: parseInt(userId, 10),
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


  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getDueDate(daysFromNow: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }
}
