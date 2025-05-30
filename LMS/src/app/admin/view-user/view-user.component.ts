import { Component } from '@angular/core';
import { GetusersService } from '../../service/getusers.service';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../userProfile/user.component';
import { IssuebooksService } from '../../service/issuebooks.service';

export interface Users {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  pass: string;
  mobileNo: string;
}

export interface issueBooks {
  issueId: number;
  userId: number;
  userName: string | null;
  bookId: number;
  bookTitle: string;
  issueDate: string;
  status: string;
  returnDate: string | null;
  finePaid: number;
}

@Component({
  selector: 'app-view-user',
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  users: any[] = [];
  issueCount!: number;
  userId!: number;

  issueBookMap: { [key: string]: string } = {};

  constructor(private getUserService: GetusersService, private issueBooksService: IssuebooksService) {
    
  }


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

  loadUser(){
    this.getUserService.getUsers().subscribe((data: any[])=>{
     this.users = data;
  });
  }

  blockUser(userId: number){
    this.getUserService.userBlock(userId).subscribe(() =>{
       alert("User blocked Successfully.");
      this.loadUser();

    }
    )
  }

  UnblockUser(userId: number){
    this.getUserService.userUnBlock(userId).subscribe(()=>{
       alert("User Unblocked Successfully.");
      this.loadUser();
    },
       error => {
    alert("Failed to block user.");
    console.error(error);
    })
  }
}
