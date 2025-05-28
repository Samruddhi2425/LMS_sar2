import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../../service/getbooks.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
books :any[]=[];
  issueBooks: any[]=[];
  returnedBooks: any[] =[];



constructor(private getBookService: GetbooksService, 
            private getIssueService: IssuebooksService,
            ){}

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
     this.getIssueService.getIssuBook().subscribe(
      (issData)=>{
      this.issueBooks = issData;
      this.returnedBooks = issData.filter(book => book.status === 'returned');
      console.log(this.returnedBooks);
      console.log(issData);
    },
    (error)=>{
    console.error('Error while feting issue data');
    }
  );
  }
}
