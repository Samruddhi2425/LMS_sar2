import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { NavbarComponent } from '../../home_/navbar/navbar.component';
import { AddManagerComponent } from "../add-manager/add-manager.component";

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, AdminSidebarComponent, NavbarComponent, AddManagerComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
