import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardService } from '../../card.service';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
 cartItems: any[] = [];

  constructor(private cartService: CardService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
   // 1. Get the item from localStorage (returns string | null)
const storedData = localStorage.getItem('bookitem');

   
  }

}

