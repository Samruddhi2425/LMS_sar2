import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { BookdescriptionComponent } from '../home_/bookdescription/bookdescription.component';
import { RouterModule } from '@angular/router';
import { GetbooksService } from '../service/getbooks.service';
import { CommonModule } from '@angular/common';
interface Books {
  authorName: string;
  base64Image: string;
  bookId: number;
  bookName: string;
  genre: string;
  isbn: string;
  quantity: string;
};


@Component({
  selector: 'app-genre',
  imports: [NavbarComponent,BookdescriptionComponent,RouterModule,NavbarComponent, CommonModule, ],
  templateUrl: './genre.component.html',
  providers: [GetbooksService],
  styleUrl: './genre.component.css'
})
export class GenreComponent implements OnInit {
book: any[]=[];
 categories: string[] = ['Biography','Romance','Classic','fiction', 'horror', 'Adventure', 'Magical Realism', 'Self-Help','Romance'];
  selectedCategory: string = '';
 


constructor(private getBookService: GetbooksService){}

  ngOnInit(): void {}
    

   onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.getBookService.ViewBookByGenre(category).subscribe({
      next: (data) => this.book = data,
      
      error: (err) => console.error('Error fetching books', err)
    });
  }

  

}
