import { Routes } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { GenreComponent } from './genre/genre.component';
import { CartComponent } from './home_/cart/cart.component';
import { BookdescriptionComponent } from './home_/bookdescription/bookdescription.component';
import { AdminComponent } from './admin/admin/admin.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './userProfile/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewBookComponent } from './admin/view-book/view-book.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminusersComponent } from './admin/adminusers/adminusers.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "genre", component: GenreComponent },
    { path: "cart", component: CartComponent },
    { path: "book", component: BookdescriptionComponent },
    {
        path: "admin", component: AdminComponent,
        children: [
            { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
            { path: 'admindashboard', component: AdminDashboardComponent },
            { path: "viewBooks", component: ViewBookComponent },
            { path: "admin-users", component: AdminusersComponent }


        ]
    },
    // {
    //     path: "manager", component: ManagerComponent,
    //     children: []
    // },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "userProfile", component: UserComponent },

];
