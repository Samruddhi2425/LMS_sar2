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
import { AddBookComponent } from './admin/add-book/add-book.component';
import { UpdateBookComponent } from './admin/update-book/update-book.component';
import { ViewUserComponent } from './admin/view-user/view-user.component';
import { ManagerComponent } from './manager/manager/manager.component';
import { ManagerdashboardComponent } from './manager/managerdashboard/managerdashboard.component';
import { UpdateManagerComponent } from './admin/update-manager/update-manager.component';
import { AddManagerComponent } from './admin/add-manager/add-manager.component';


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

    {
        path: "manager", component: ManagerComponent,
        children: [
            //{ path: '', redirectTo: 'managerLogin', pathMatch: 'full' },
            // { path: '', component: LoginComponent },
            { path: '', component: ManagerdashboardComponent },
            { path: 'managerdashboard', component: ManagerdashboardComponent },
            { path: 'viewBook', component: ViewBookComponent },
            { path: 'addbook', component: AddBookComponent },
            { path: 'viewUser', component: ViewUserComponent },
            { path: 'update-book/:id', component: UpdateBookComponent }

        ]
    },
    {
        path: "admin", component: AdminComponent,
        children: [
            { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
            { path: 'admindashboard', component: AdminDashboardComponent },
            { path: "viewBooks", component: ViewBookComponent },
            { path: "admin-users", component: ViewUserComponent },
            { path: 'addManager', component: AddManagerComponent },
            { path: 'updateManager', component: UpdateManagerComponent },
            { path: 'update_book/:id', component: UpdateBookComponent },
            { path: 'addbook', component: AddBookComponent }
        ]
    },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "userProfile", component: UserComponent },
    { path: "addBook", component: AddBookComponent }

];
