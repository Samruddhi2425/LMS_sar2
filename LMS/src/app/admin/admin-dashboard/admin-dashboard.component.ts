import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../../service/getbooks.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { GetusersService } from '../../service/getusers.service';
import { UserService } from '../../service/user.service';
import { issueBook } from '../userProfile/user.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  totalBooks!: number;
  totalUser!: number;
  totalManagers!:number;
  IssueBooks: any[]=[];
  totalIssueBooks!:number;
  totalReturnBooks!:number;
  issuePendingReturns!: issueBook[];
    issueCompletedReturns!: issueBook[];
  
  constructor(
    private getBooksService: GetbooksService, 
    private issueBooksService: IssuebooksService,
    private getUsersService: GetusersService,
  private userService:UserService)
  {
    getUsersService.getUsers().subscribe({
      next: (res:any[]) => {
        this.totalUser = res.length;
      }
    });

    getBooksService.getBooks().subscribe({
      next:(res:any[])=>{
        this.totalBooks = res.length;
      }
    });

    issueBooksService.getIssuBook().subscribe({
      next: (res:any)  =>{
        
        this.IssueBooks = res.length;
      }
    });


    userService.getManagers().subscribe({
      next: (res:any)  =>{
        this.totalManagers = res.length;
      }
    })
    
  }
  ngOnInit(): void {
    this.issueBooksService.getIssuBook().subscribe(
      (issData) => {
        this.IssueBooks = issData;
        this.issuePendingReturns = issData.filter(book => book.status === 'Issued');
        this.issueCompletedReturns = issData.filter(book => book.status === 'returned');
        this.totalIssueBooks = this.issuePendingReturns.length;
        this.totalReturnBooks = this.issueCompletedReturns.length;
        console.log("ReturnBooks"+this.issueCompletedReturns);
        console.log("IssueBooks"+this.issuePendingReturns);
      },
      (error) => {
        console.error('Error while feting issue data');
      }
    );
  }
}
