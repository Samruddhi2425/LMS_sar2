import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { GetusersService } from '../service/getusers.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule,NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
interface Users{
  userId:number;
  firstName:string;
  lastName:string;
  email:string;
  pass:string;
  mobileNo:string;
}

export class UserComponent {
users:any[]=[];
constructor(private getUserService: GetusersService){}

}



}
