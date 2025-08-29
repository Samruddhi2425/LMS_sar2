import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../../service/getbooks.service';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, RouterOutlet } from '@angular/router';
import { IssuebooksService } from '../../service/issuebooks.service';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UserComponent } from '../../user/user/user.component';
import { AuthService } from '../../service/auth.service';



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
  imports: [CommonModule, RouterModule, UserComponent, UpdateBookComponent, FormsModule,RouterOutlet],
  templateUrl: './view-book.component.html',

  providers: [GetbooksService],
  styleUrl: './view-book.component.css'
})
export class ViewBookComponent implements OnInit {
  books: any[] = [];
  isAdmin: boolean = false;
isManager: boolean = false;
  issueBooks: any[] = [];
  returnedBooks: any[] = [];
  searchTerm: string = '';
  allBooks: any[] = [];
  //pagignation for Book table 
  pageSize: number = 7;
  currentPage: number = 1;
  totalPages: number = 0;
  pagedBooks: any[] = [];
  //pagignation for return book table 
  returnedCurrentPage: number = 1;
  returnedPageSize: number = 7;
  returnedTotalPages: number = 0;
  pagedReturnedBooks: any[] = [];
  pendingCount!: number;
  returnCount!: number;

  ////pagignation for pendingBooks  table 
  pendingBooks: any[] = [];
  allPendingBooks: any[] = [];
  pagedPendingBooks: any[] = [];

  pendingCurrentPage: number = 1;
  pendingPageSize: number = 7;
  pendingTotalPages: number = 0;

  isPending = false;
  isReturn = false;





  constructor(private getBookService: GetbooksService,
    private getIssueService: IssuebooksService,private authService:AuthService
  ) { }

  //pagignation for book
  updatePagedBooks(): void {
    // const startIndex = (this.currentPage - 1) * this.pageSize;
    // const endIndex = startIndex + this.pageSize;
    // this.pagedBooks = this.allBooks.slice(startIndex, endIndex);

     const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.pagedBooks = this.books.slice(startIndex, endIndex);
  this.totalPages = Math.ceil(this.books.length / this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Don't allow invalid pages
    }
    this.currentPage = page;
    this.updatePagedBooks();
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedBooks();
    }
  }
  //pagination dor return book
  updatePagedReturnedBooks(): void {
    const startIndex = (this.returnedCurrentPage - 1) * this.returnedPageSize;
    const endIndex = startIndex + this.returnedPageSize;
    this.pagedReturnedBooks = this.returnedBooks.slice(startIndex, endIndex);
  }

  goToReturnedPageR(page: number): void {
    if (page < 1 || page > this.returnedTotalPages) return;
    this.returnedCurrentPage = page;
    this.updatePagedReturnedBooks();
  }

  goToPageR(page: number): void {
    if (page < 1 || page > this.returnedTotalPages) {
      return; // Don't allow invalid pages
    }
    this.returnedCurrentPage = page;
    this.updatePagedReturnedBooks();
  }

  nextPageR(): void {
    if (this.returnedCurrentPage < this.returnedTotalPages) {
      this.returnedCurrentPage++;
      this.updatePagedReturnedBooks();
    }
  }

  //pagination dor pending book
  updatePagedPendingBooks(): void {
    const startIndex = (this.pendingCurrentPage - 1) * this.pendingPageSize;
    const endIndex = startIndex + this.pendingPageSize;
    this.pagedPendingBooks = this.pendingBooks.slice(startIndex, endIndex);
  }

  goToReturnedPageP(page: number): void {
    if (page < 1 || page > this.pendingTotalPages) return;
    this.pendingCurrentPage = page;
    this.updatePagedPendingBooks();
  }

  goToPageP(page: number): void {
    if (page < 1 || page > this.pendingTotalPages) {
      return; // Don't allow invalid pages
    }
    this.pendingCurrentPage = page;
    this.updatePagedPendingBooks();
  }

  nextPageP(): void {
    if (this.pendingCurrentPage < this.pendingTotalPages) {
      this.pendingCurrentPage++;
      this.updatePagedPendingBooks();
    }
  }



  ngOnInit(): void {
    const role = this.authService.getUserRole(); // replace with your user service
  this.isAdmin = (role === 'admin');
  this.isManager = (role === 'manager');
    this.getBookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        this.allBooks = data;
        this.totalPages = Math.ceil(this.allBooks.length / this.pageSize);
        this.updatePagedBooks();
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
    this.getIssueService.getIssuBook().subscribe(
      (issData) => {
        this.issueBooks = issData;
        this.returnedBooks = this.issueBooks.filter(book => book.status === 'returned');
        this.pendingBooks = this.issueBooks.filter(book => book.status === 'Issued');
        this.pendingCount = this.pendingBooks.length;
        this.returnCount = this.returnedBooks.length;
        this.allPendingBooks = [...this.pendingBooks];

        this.returnedTotalPages = Math.ceil(this.returnCount / this.returnedPageSize);
        this.pendingTotalPages = Math.ceil(this.pendingCount / this.pendingPageSize);

        this.updatePagedReturnedBooks();
        this.updatePagedPendingBooks();
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

  bookBtn(){
    this.isPending=false;
      this.isReturn=false;
      setTimeout(() => { // Small timeout to ensure fragment is processed
        const element = document.getElementById("Pending-Book");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  }

  pendingBtn(){
    this.isPending=true;
      this.isReturn=false;
      setTimeout(() => { // Small timeout to ensure fragment is processed
        const element = document.getElementById("Pending-Book");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  }

  returnBtn(){
    this.isPending=false;
      this.isReturn=true;
      setTimeout(() => { // Small timeout to ensure fragment is processed
        const element = document.getElementById("returnedBook");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
  }

  scrollTo(id: string) {
      this.isPending=true;
      this.isReturn=false;
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
  this.currentPage = 1;
  this.updatePagedBooks(); // Update pagedBooks after filtering
}

onSearchInputChange(): void {
  if (this.searchTerm.trim() === '') {
    this.books = [...this.allBooks]; // Reset full list
    this.currentPage = 1;
    this.updatePagedBooks();
  }
}

clearSearch(): void {
  this.searchTerm = '';
  this.books = [...this.allBooks]; // Reset full list
  this.currentPage = 1;
  this.updatePagedBooks();
}



  downloadPDF() {
    const doc = new jsPDF();

    doc.text('Pending Book Returns', 14, 15);

    const head = [['User ID', 'Book ID', 'Order Date','DueDate']];
    const data = this.issueBooks.map(book => [
      book.userId,
      book.bookId,
      book.issueDate,
      book.dueDate
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