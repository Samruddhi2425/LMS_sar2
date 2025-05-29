import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

import { GetbooksService } from '../../service/getbooks.service';
import { BookdescriptionComponent } from '../bookdescription/bookdescription.component';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule, isPlatformServer } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponent } from '../../admin/userProfile/user.component';
import { CartComponent } from '../cart/cart.component';
import { LoginComponent } from '../../login/login.component';
import { CardService } from '../../card.service';

declare var bootstrap: any; // Required for Bootstrap JS methods
interface BookItem {
  authorName: string;
  base64Image: string;
  bookId: string;
  bookName: string;
  genre: string;
  isbn: string;
  quantity: string;
};


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, CommonModule, FormsModule, RouterModule, CartComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [GetbooksService, CardService]
})


export class HomeComponent implements OnInit, AfterViewInit {
  books: any[] = [];
  searchTerm: string = '';

  constructor(private getBookService: GetbooksService, private cardService: CardService) { }

  ngOnInit(): void {
    this.getBookService.getBooks().subscribe(
      (data) => {
        this.books = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    const carouselElement = document.getElementById('bookCarousel');

    if (carouselElement) {
      const carousel = bootstrap.Carousel.getOrCreateInstance(carouselElement, {
        interval: 4000,
        ride: 'carousel'
      });
    }
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      console.log('Searching for:', this.searchTerm);

      // Fetch books from the service (or use existing data if already fetched)
      this.getBookService.getBooks().subscribe(
        (data) => {
          // Filter the books based on the search term
          this.books = data.filter(book =>
            book.bookName.toLowerCase().includes(this.searchTerm.toLowerCase())
          );

          console.log('Filtered books:', this.books);
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    } else {
      alert('Please enter a search term.');
    }
  }

  onReset() {
    this.searchTerm = ''; // clear search input
    this.getBookService.getBooks().subscribe(
      (data) => {
        this.books = data; // show all books again
        console.log('All books:', this.books);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  addToCart(item: any) {
    this.cardService.addToCart(item);
  }

}
