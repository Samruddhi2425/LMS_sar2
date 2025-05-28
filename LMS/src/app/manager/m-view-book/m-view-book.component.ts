import { Component } from '@angular/core';
import { GetbooksService } from '../../service/getbooks.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-m-view-book',
  imports: [RouterModule,FormsModule],
  templateUrl: './m-view-book.component.html',
  styleUrl: './m-view-book.component.css'
})
export class MViewBookComponent {


 books:any[]=[];
  issueBooks:any[]=[];
  returnedBooks: any[] = [];

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