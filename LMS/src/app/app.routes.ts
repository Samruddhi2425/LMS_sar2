import { Routes } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { BookdescriptionComponent } from './home_/bookdescription/bookdescription.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"book",component:BookdescriptionComponent}

];
