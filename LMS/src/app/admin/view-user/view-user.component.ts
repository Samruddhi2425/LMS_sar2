import { Component } from '@angular/core';
import { GetusersService } from '../../service/getusers.service';
import { CommonModule } from '@angular/common';

interface Users{
  userId:number;
  firstName:string;
  lastName:string;
  email:string;
  pass:string;
  mobileNo:string;
}

@Component({
  selector: 'app-view-user',
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
    users:any[]=[];
  constructor(private getUserService: GetusersService){}

  ngOnInit(): void {
    this.getUserService.getUsers().subscribe(
      (data)=>{
        this.users = data;
        console.log(data);
      },
      (error)=>{
        console.error('Error fetching books:',error);
      }
    );
  }
}
