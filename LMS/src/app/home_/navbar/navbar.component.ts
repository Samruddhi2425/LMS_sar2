import { Component } from '@angular/core';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  providers: [CardService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
cartItems: any[] = [];

  getCartItems() {
    return this.cartItems;
  }
}
