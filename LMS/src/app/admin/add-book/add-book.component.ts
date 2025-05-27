import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  book = {
    bookName: '',
    authorName: '',
    isbn: '',
    genre: '',
    quantity: '',
    base64Image: ''
  };

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.book.base64Image = (reader.result as string).split(',')[1];
    };

    reader.readAsDataURL(file);
  }

  uploadBook() {
    this.http.post('https://localhost:7252/api/Books/AddBook', this.book)
      .subscribe(() => alert('Book Uploaded'));
      alert("data is successfully added");
      //alert('Book Uploaded');

    // ✅ Reset the book object
    this.book = {
      bookName: '',
      authorName: '',
      isbn: '',
      genre: '',
      quantity: '',
      base64Image: ''
    };
  }

}
