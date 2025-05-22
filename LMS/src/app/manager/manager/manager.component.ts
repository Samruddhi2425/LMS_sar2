import { Component } from '@angular/core';
import { ManagerSidebarComponent } from '../manager-sidebar/manager-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavbarComponent } from "../../home_/navbar/navbar.component";

@Component({
  selector: 'app-manager',
  imports: [ManagerSidebarComponent, NavbarComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
