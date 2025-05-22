import { Component,  OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import { GetbooksService } from '../../service/getbooks.service';
import { BookdescriptionComponent } from '../bookdescription/bookdescription.component';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddBookComponent } from '../../manager/add-book/add-book.component';
import { CartComponent } from '../../cart/cart.component';
import { GenreComponent } from '../../genre/genre.component';



@Component({
  selector: 'app-home',
  imports: [NavbarComponent,HttpClientModule,CommonModule,FormsModule,RouterModule,GenreComponent],


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
