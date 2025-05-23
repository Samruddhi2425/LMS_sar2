import { Injectable } from '@angular/core';
import { concatWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cartItems: any[] = [];

  addToCart(item: any) {
   // console.log(item);
   
     if(this.cartItems.length == 0)
      {
       this.cartItems.push(item);
       console.log('empty');
       localStorage.setItem('bookitem',JSON.stringify(item));
     }else{
   console.log(item.bookId);
   const data =  this.cartItems.find(itm=>itm.bookId === item.bookId);
     if(data === undefined && this.cartItems.length <3){
      this.cartItems.push(item);
      console.log('pushed');
      console.log(item);
      console.log(this.cartItems.length)
       localStorage.setItem('bookitem',JSON.stringify(item));
     }
   
     }
     
     

    // if (!this.cartItems.find(cartItem => cartItem.id === item.id)) {
    //   this.cartItems.push(item);
    //   //console.log(item);
    // }

    // this.cartItems.forEach(res=>{
    //    console.log(res);
    // })
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}
