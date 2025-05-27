import { Component } from '@angular/core';
import { GetbooksService } from '../../service/getbooks.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { GetusersService } from '../../service/getusers.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  totalBooks!: number;
  totalUser!: number;
  totalIssueBooks: any[]=[];
  constructor(
    private getBooksService: GetbooksService, 
    private issueBooksService: IssuebooksService,
    private getUsersService: GetusersService)
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
        this.totalIssueBooks = res.length;
      }
    });
    
  }

}
