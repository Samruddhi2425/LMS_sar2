import { Routes } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { GenreComponent } from './genre/genre.component';
import { CartComponent } from './home_/cart/cart.component';
import { BookdescriptionComponent } from './home_/bookdescription/bookdescription.component';
import { AdminComponent } from './admin/admin/admin.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './admin/userProfile/user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewBookComponent } from './admin/view-book/view-book.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminusersComponent } from './admin/adminusers/adminusers.component';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { UpdateBookComponent } from './admin/update-book/update-book.component';
import { ViewUserComponent } from './admin/view-user/view-user.component';
import { ManagerComponent } from './manager/manager/manager.component';
import { ManagerdashboardComponent } from './manager/managerdashboard/managerdashboard.component';
import { MViewBookComponent } from './manager/m-view-book/m-view-book.component';
import { MViewUserComponent } from './manager/m-view-user/m-view-user.component';
import { UpdateManagerComponent } from './admin/update-manager/update-manager.component';
import { MUpdateBookComponent } from './manager/m-update-book/m-update-book.component';
import { MAddBookComponent } from './manager/m-add-book/m-add-book.component';


export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "genre", component: GenreComponent },
    { path: "cart", component: CartComponent },
    { path: "book", component: BookdescriptionComponent },
    // app-routing.module.ts (or your routing module)

    { path: 'admin/updateBook/:id', component: UpdateBookComponent },

    {path:"manager", component: ManagerComponent,
        children: [
            //{ path: '', redirectTo: 'managerLogin', pathMatch: 'full' },
            {path:'',component:LoginComponent},
            {path: 'managerdashboard', component: ManagerdashboardComponent },
            {path: 'viewBook', component: MViewBookComponent},
            {path: 'addbook', component:MAddBookComponent},
            {path: 'viewUser', component: MViewUserComponent},
            {path:'updateManager',component:UpdateManagerComponent},
             {path:'update-book/:id', component: MUpdateBookComponent}
            
        
           
         ]
    },
    {
        path: "admin", component: AdminComponent,
        children: [
            { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
            { path: 'admindashboard', component: AdminDashboardComponent },
            { path: "viewBooks", component: ViewBookComponent },
            { path: "admin-users", component: ViewUserComponent },
            { path: 'update_book/:id', component: UpdateBookComponent }
        ]
    },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "userProfile", component: UserComponent },
    { path: "addBook", component: AddBookComponent }

];
