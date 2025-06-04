import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookItem } from './home_/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cartItems: BookItem[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  // Observable to track cart count changes
  cartCount$ = this.cartCount.asObservable();

  addToCart(item: BookItem) {
    if (this.cartItems.length === 0) {
      this.cartItems.push(item);
    } else {
      const data = this.cartItems.find(itm => itm.bookId === item.bookId);
      if (data === undefined && this.cartItems.length < 3) {
        this.cartItems.push(item);
      }
    }
    
    // Update localStorage
    const bookData = JSON.stringify(this.cartItems);
    localStorage.setItem('bookitem', bookData);
    
    // Update the cart count
    this.cartCount.next(this.cartItems.length);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('bookitem');
    this.cartCount.next(0);
  }

  // Add this method to initialize cart from localStorage
  initializeCart() {
    const storedItems = localStorage.getItem('bookitem');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
      this.cartCount.next(this.cartItems.length);
    }
  }
}