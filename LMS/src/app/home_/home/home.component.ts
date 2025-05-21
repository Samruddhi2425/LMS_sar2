import { Component, NgModule, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GetbooksService } from '../../service/getbooks.service';
import { BookdescriptionComponent } from '../bookdescription/bookdescription.component';
import { RouterModule } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-home',
  imports: [NavbarComponent,HttpClientModule,NgModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[GetbooksService]
})
export class HomeComponent implements OnInit{
books: any[]=[];
constructor(private getBookService: GetbooksService){}

ngOnInit(): void {
  this.getBookService.getBooks().subscribe(
    (data) => {
      this.books = data;
      console.log(data);
    },
    (error) => {
      console.error('Error fetching books:',error);
    }
  );
}
}
