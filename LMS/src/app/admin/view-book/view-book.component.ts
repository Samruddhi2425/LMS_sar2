import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../../service/getbooks.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';


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
  imports: [CommonModule,RouterModule],
  templateUrl: './view-book.component.html',
  providers:[GetbooksService],
  styleUrl: './view-book.component.css'
})
export class ViewBookComponent implements OnInit{
  books:any[]=[];

constructor(private getBookService: GetbooksService){
  
}
  ngOnInit(): void {
    this.getBookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

}
