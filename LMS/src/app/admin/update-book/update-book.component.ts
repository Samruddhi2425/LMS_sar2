import { Component,NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetbooksService } from '../../service/getbooks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-book',
  imports: [RouterModule,FormsModule ],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent implements OnInit {
 bookId!: number;
  book: any = {};

   constructor(
    private route: ActivatedRoute,
    private bookService: GetbooksService,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.loadBook();

  }
  loadBook() {
    this.bookService.getBookById(this.bookId).subscribe({
      next: data => this.book = data,
      error: err => console.error('Error loading book:', err)
    });
  }

  updateBook() {
    this.bookService.updateBookData(this.book).subscribe({
      next: res => {
        alert('Book updated successfully!');
        this.router.navigate(['/admin/viewBooks']); // Navigate back after update
      },
      error: err => console.error('Error updating book:', err)
    });
  }
}









