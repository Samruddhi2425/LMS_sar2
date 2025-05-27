import { Component } from '@angular/core';
import { GetusersService } from '../../service/getusers.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../userProfile/user.component';
import { IssuebooksService } from '../../service/issuebooks.service';

interface Users {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
  mobileNo: string;
}

@Component({
  selector: 'app-view-user',
  imports: [CommonModule, UserComponent],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
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
