import { Routes } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { CartComponent } from './home_/cart/cart.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"cart",component:CartComponent}

];
