import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {  CardService } from '../../card.service';
import { BookItem, HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { IssuebooksService } from '../../service/issuebooks.service';

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: BookItem[] = [];
  cartCount!: number;

  constructor(private cartService: CardService, private issueBookService: IssuebooksService) {
    const storedData = localStorage.getItem('bookitem');

    if (storedData == null) {

    }
    else {
      const finalData: BookItem[] = JSON.parse(storedData) as BookItem[];
      this.cartItems = finalData;

    }

  }

  ngOnInit() {
    // this.cartItems = this.cartService.getCartItems();
    // 1. Get the item from localStorage (returns string | null)
    const storedData = localStorage.getItem('bookitem');
    if (storedData) {
      this.cartItems = JSON.parse(storedData);
      this.cartCount = this.cartItems.length;
      console.log("cartcount on cart:"+this.cartCount)
    }


  }

  //---------issue book by cart
  //   onBookSelected(event: any, book: any): void {
  //   const isChecked = event.target.checked;

  //   const userId = localStorage.getItem('userId');
  //   console.log("userid: "+userId);
  //   if (!userId) {
  //     alert('Please login first.');
  //     return;
  //   }

  //   if (isChecked) {
  //     // Store in localStorage
  //     localStorage.setItem('selectedBookId', book.bookId);
  //     localStorage.setItem('selectedUserId', userId);
  // console.log("bookid: "+book.bookId)
  //     // Prepare issueBook object
  //     const issueData = {
  //       userId: parseInt(userId, 10),
  //       bookId: book.bookId,
  //       issueDate: new Date().toISOString().split('T')[0],
  //       dueDate: this.getDueDate(7),
  //       bookQty: 1,
  //       status: 'Issued'
  //     };

  //     // Call service to issue book
  //     this.issueBookService.issueBook(issueData).subscribe({
  //       next: () => alert('Book issued successfully!'),
  //       error: () => alert('Failed to issue book.')
  //     });
  //   } else {
  //     // Optional: handle deselect / removal
  //     console.log('Checkbox unchecked');
  //   }
  // }

  selectedBook: any = null;
  onCheckboxChange(event: any, book: any): void {
    const isChecked = event.target.checked;
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please log in first.');
      event.target.checked = false;
      return;
    }

    if (isChecked) {
      this.selectedBook = book;
      localStorage.setItem('selectedBookId', book.bookId.toString());
      localStorage.setItem('selectedUserId', userId);
    } else {
      this.selectedBook = null;
      localStorage.removeItem('selectedBookId');
      localStorage.removeItem('selectedUserId');
    }
  }

  issueSelectedBook(): void {
    const userId = localStorage.getItem('selectedUserId');
    const bookId = localStorage.getItem('selectedBookId');

    if (!userId || !bookId) {
      alert('Please select a book and make sure you are logged in.');
      return;
    }

    const issueData = {
      userId: parseInt(userId, 10),
      bookId: parseInt(bookId, 10),
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: this.getDueDate(7),
      bookQty: 1,
      status: 'Issued'
    };

    this.issueBookService.issueBook(issueData).subscribe({
      next: () => {
        alert('Book issued successfully!');
        // Optionally clear selection
        localStorage.removeItem('selectedBookId');
        localStorage.removeItem('selectedUserId');
      },
      error: () => {
        alert('Failed to issue book.');
      }
    });
  }

  getDueDate(daysAhead: number): string {
    const due = new Date();
    due.setDate(due.getDate() + daysAhead);
    return due.toISOString().split('T')[0];
  }


}

