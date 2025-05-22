import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartComponent } from '../cart/cart.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,CartComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
