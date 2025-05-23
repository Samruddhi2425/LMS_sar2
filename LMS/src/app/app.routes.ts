import { Routes } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { GenreComponent } from './genre/genre.component';
import { CartComponent } from './home_/cart/cart.component';
import { BookdescriptionComponent } from './home_/bookdescription/bookdescription.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ManagerComponent } from './manager/manager/manager.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './userProfile/user.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"genre", component:GenreComponent},
    {path:"cart", component:CartComponent},
    {path:"book",component:BookdescriptionComponent},
    {path:"admin", component:AdminComponent,
        children:[
            {path:"userProfile",component:UserComponent},
            {path:"",component:AdminDashboardComponent}
        ]
    },
    {path:"manager",component:ManagerComponent,
        children:[

        ]
    },

];
