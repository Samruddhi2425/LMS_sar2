import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../../service/getbooks.service';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, RouterOutlet } from '@angular/router';

import { IssuebooksService } from '../../service/issuebooks.service';
import { UserComponent } from '../userProfile/user.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



interface Books {
  authorName: string;
  base64Image: string;
  bookId: number;
  bookName: string;
  genre: string;
  isbn: string;
  quantity: string;
};

@Component({
  selector: 'app-view-book',
  imports: [CommonModule, RouterModule, UserComponent, UpdateBookComponent, FormsModule],
  templateUrl: './view-book.component.html',

  providers: [GetbooksService],
  styleUrl: './view-book.component.css'
})
export class ViewBookComponent implements OnInit {
  books: any[] = [];
  issueBooks: any[] = [];
  returnedBooks: any[] = [];
  searchTerm: string = '';
  allBooks: any[] = [];

  constructor(private getBookService: GetbooksService,
    private getIssueService: IssuebooksService,
  ) { }

  ngOnInit(): void {
    this.getBookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.allBooks = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
    this.getIssueService.getIssuBook().subscribe(
      (issData) => {
        this.issueBooks = issData;
        this.returnedBooks = issData.filter(book => book.status === 'returned');
        console.log(this.returnedBooks);
        console.log(issData);
      },
      (error) => {
        console.error('Error while feting issue data');
      }
    );
  }
  // goToUpdateBook(bookId:number): void{

  // //  this.router.navigate(['/admin/viewBooks/update_book', bookId]);
  // }
  scrollTo(id: string) {
    setTimeout(() => { // Small timeout to ensure fragment is processed
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  onSearch(event: Event): void {
    event.preventDefault(); // Prevent form reload
    const term = this.searchTerm.toLowerCase();
    this.books = this.allBooks.filter(book =>
      book.bookName.toLowerCase().includes(term) ||
      book.authorName.toLowerCase().includes(term) ||
      book.isbn.toLowerCase().includes(term) ||
      book.genre.toLowerCase().includes(term)
    );
  }
  onSearchInputChange(): void {
    if (this.searchTerm.trim() === '') {
      this.books = [...this.allBooks]; // Reset the full book list
    }
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.books = [...this.allBooks]; // Reset book list
  }

  downloadPDF() {
    const doc = new jsPDF();

    doc.text('Pending Book Returns', 14, 15);

    const head = [['Order ID', 'Book ID', 'Order Date']];
    const data = this.issueBooks.map(book => [
      book.issueId,
      book.bookId,
      book.issueDate
    ]);

    autoTable(doc, {
      head: head,
      body: data,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] }
    });

    doc.save('pending-returns.pdf');
  }
}