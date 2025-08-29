import { Routes } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { GenreComponent } from './genre/genre.component';
import { CartComponent } from './home_/cart/cart.component';
import { BookdescriptionComponent } from './home_/bookdescription/bookdescription.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './user/user/user.component';
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
import { AuthService } from './service/auth.service';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ConfirmComponent } from './login/forgot-password/confirm/confirm.component';
import { UserRequestComponent } from './admin/user-request/user-request.component';
import { UserLayoutComponent } from './admin/user-layout/user-layout.component';
import { CategoryComponent } from './admin/category/category.component';
import { ManagerRegisterComponent } from './manager/manager-register/manager-register.component';
import { ManagerViewBookComponent } from './manager/manager-view-book/manager-view-book.component';
import { ManagerProfileComponent } from './manager/manager-profile/manager-profile.component';
import { ManagerChangePassComponent } from './manager/manager-change-pass/manager-change-pass.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { PendingBooksComponent } from './user/pending-books/pending-books.component';
import { UserChangePassComponent } from './user/user-change-pass/user-change-pass.component';
import { IssuebookReportComponent } from './admin/issuebook-report/issuebook-report.component';


export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "home", component: HomeComponent },
    { path: "genre", component: GenreComponent },
    { path: "cart", component: CartComponent },
    { path: "book", component: BookdescriptionComponent },
    { path: 'forgot', component: ForgotPasswordComponent },
    { path: 'confirm', component: ConfirmComponent },
    // { path: 'admin/updateBook/:id', component: UpdateBookComponent },
    // { path: 'manager/updateBook/:id', component: UpdateBookComponent },
    { path: 'managerRegister', component: ManagerRegisterComponent },

    {
        path: "user", component: UserComponent,
        canActivate: [AuthService],
        data: { expectedRole: 'user' },
        children: [
            { path: "userProfile", component: UserProfileComponent },
            { path: "userDashboard", component: UserDashboardComponent },
            { path: "pendingBooks", component: PendingBooksComponent},
            { path: "changePassword", component: UserChangePassComponent}
        ]
    },

    {
        path: "manager", component: ManagerComponent,
        canActivate: [AuthService],
        data: { expectedRole: 'manager' },
        children: [
            //{ path: '', redirectTo: 'managerLogin', pathMatch: 'full' },
            // { path: '', component: LoginComponent },
            { path: '', component: ManagerdashboardComponent },
            { path: 'managerdashboard', component: ManagerdashboardComponent },
            { path: 'viewBook', component: ManagerViewBookComponent },
            { path: 'managerProfile', component: ManagerProfileComponent },
            { path: 'changePassword', component: ManagerChangePassComponent },
            { path: 'addbook', component: AddBookComponent },
            { path: 'viewUser', component: ViewUserComponent },
            { path: 'updatebook/:id', component: UpdateBookComponent }

        ]
    },
    {
        path: "admin", component: AdminComponent,
        canActivate: [AuthService],
        data: { expectedRole: 'admin' },
        children: [
            { path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
            { path: 'admindashboard', component: AdminDashboardComponent },
            { path: "viewBooks", component: ViewBookComponent },
            { path: "admin-users", component: ViewUserComponent },
            { path: 'addManager', component: AddManagerComponent },
            // { path: 'updateManager', component: UpdateManagerComponent },
            { path: 'update_book/:id', component: UpdateBookComponent },
            { path: 'addbook', component: AddBookComponent },
            { path: 'userRequest', component: UserRequestComponent },
            { path: 'admin/updateManager/:id', component: UpdateManagerComponent },
            { path: 'updateManager/:id', component: UpdateManagerComponent },
            { path: 'category', component: CategoryComponent },
            {path: 'issueBookReport', component:IssuebookReportComponent}
        ]
    },
    

    // { path: "addBook", component: AddBookComponent },


];
