import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  // cartItems = []; // Array to hold cart items

  // get cartItemCount(): number {
  //   return this.cartItems.length;
  // }

  // // Method to add a book to the cart
  // addToCart(book: Book) {
  //   if (this.cartItemCount < 3) {
  //     this.cartItems.push(book);
  //   } else {
  //     alert('You can only add up to 3 books to the cart.');
  //   }
  // }

  selectedItems: any[] = [];

onItemSelectionChange(item: any) {
  if (item.selected) {
    this.selectedItems.push(item);
  } else {
    this.selectedItems = this.selectedItems.filter(i => i !== item);
  }
}

}

