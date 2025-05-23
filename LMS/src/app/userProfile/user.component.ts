import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { GetusersService } from '../service/getusers.service';
import { IssuebooksService } from '../service/issuebooks.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule,NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})


export class UserComponent {
//IssueBook
issueBooks:any[]=[];
returnedBooks: any[] = [];

constructor(private getIssueService: IssuebooksService){}

  ngOnInit(): void{

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





