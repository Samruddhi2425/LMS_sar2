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
 getCartItems() {
    // Use routing to go to cart component
  }
}
