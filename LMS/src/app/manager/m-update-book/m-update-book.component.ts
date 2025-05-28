import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetbooksService } from '../../service/getbooks.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-m-update-book',
  imports: [RouterModule, FormsModule],
  templateUrl: './m-update-book.component.html',
  styleUrl: './m-update-book.component.css'
})
export class MUpdateBookComponent implements OnInit {
 bookId!: number;
  
   book : any = {
    bookName: '',
    authorName: '',
    isbn: '',
    genre: '',
    quantity: '',
    base64Image: ''
  };

   constructor(
    private route: ActivatedRoute,
    private bookService: GetbooksService,
    private router: Router
  ) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.book.base64Image = (reader.result as string).split(',')[1];
    };

    reader.readAsDataURL(file);
  }


  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;
    this.loadBook();

  }
  loadBook() {

    this.bookService.getBookById(this.bookId).subscribe(
      next => {  this.book = next;console.log("data:",next)},
    
      error => { console.error('Error loading book:', error)}
    );
      //console.log(this.book.bookIamage);

  }

  // onFileChange(event: any) {
  // const file = event.target.files[0];
  // if (!file) return;
  
  // }

  updateBook() {
     console.log("Submitting book to backend:", this.book); // Add this line
    this.bookService.updateBookData(this.book).subscribe({
      next: res => {
        console.log("res"+res);
        alert('Book updated successfully!');
        this.router.navigate(['/admin/viewBooks']); // Navigate back after update
      
      },
      error: err => console.error('Error updating book:', err)
      
    });
  }
}
