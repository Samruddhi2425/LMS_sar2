import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GetbooksService } from '../../service/getbooks.service';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,GetbooksService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
books: any[]=[];
constructor(private getBookService: GetbooksService){}

ngOnInit(): void {
  this.getBookService.getBooks().subscribe(
    (data) => {
      this.books = data;
    },
    (error) => {
      console.error('Error fetching books:',error);
    }
  );
}
}
