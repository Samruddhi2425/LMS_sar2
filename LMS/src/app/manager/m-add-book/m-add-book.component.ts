import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-m-add-book',
  imports: [],
  templateUrl: './m-add-book.component.html',
  styleUrl: './m-add-book.component.css'
})
export class MAddBookComponent {
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
