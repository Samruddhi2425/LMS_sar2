import { Routes } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { GenreComponent } from './genre/genre.component';
import { CartComponent } from './home_/cart/cart.component';
import { DashboardComponent } from './manager/dashboard/dashboard.component';
import { UserComponent } from './userProfile/user.component';
import { ManagerComponent } from './manager/manager/manager.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"genre", component:GenreComponent},
    {path:"cart", component:CartComponent},
    {path:"manager", component:ManagerComponent},
    {path:"managerdashboard",component:DashboardComponent},
    {path:"user",component:UserComponent},
    {path:"login",component:LoginComponent},
    {path:"signup",component:RegisterComponent}

];
