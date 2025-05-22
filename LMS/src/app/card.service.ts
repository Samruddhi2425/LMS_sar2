import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cartItems: any[] = [];

  addToCart(item: any) {
    if (!this.cartItems.find(cartItem => cartItem.id === item.id)) {
      this.cartItems.push(item);
      console.log(item);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}
