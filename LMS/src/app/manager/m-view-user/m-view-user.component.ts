import { Component } from '@angular/core';
import { GetusersService } from '../../service/getusers.service';
import { IssuebooksService } from '../../service/issuebooks.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-m-view-user',
  imports: [RouterModule],
  templateUrl: './m-view-user.component.html',
  styleUrl: './m-view-user.component.css'
})
export class MViewUserComponent {

   users: any[] = [];
    issueCount!: number;
    userId!: number;
    issueBooks: any[] = [];
  
    issueBookMap: { [key: string]: string } = {};
  
    constructor(private getUserService: GetusersService, private issueBooksService: IssuebooksService) { }
  
    ngOnInit(): void {
      this.getUserService.getUsers().subscribe(
        (data) => {
          this.users = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  
      
  
      //this.issueCount = this.issueBooksService.issueBookByUser(this.userId);
  
      this.issueBooksService.issueBookByUser(this.userId).subscribe(data => {
        this.issueCount = data.length;
      });
    }
}
