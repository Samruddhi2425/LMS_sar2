import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetbooksService } from '../../service/getbooks.service';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{
  book = {
    bookName: '',
    authorName: '',
    isbn: '',
    genre: '',
    genreId:'',
    quantity: '',
    base64Image: ''
  };
  category: any[]=[];

  constructor(private http: HttpClient,private getBookService: GetbooksService) {}
  ngOnInit(): void {
    this.getBookService.getGenre().subscribe(
      (data) => {
        this.category = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.book.base64Image = (reader.result as string).split(',')[1];
    };

    reader.readAsDataURL(file);
  }

  uploadBook() {
    console.log(this.book)
    this.http.post('https://localhost:7252/api/Books/AddBook', this.book)
      .subscribe(() => alert('Book Uploaded'));
      alert("data is successfully added");
      //alert('Book Uploaded');

    // ✅ Reset the book object
    this.book = {
      bookName: '',
      authorName: '',
      isbn: '',
      genreId: '',
      genre: '',
      quantity: '',
      base64Image: ''
    };
  }

  

}
