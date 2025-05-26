import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { UserComponent } from '../../userProfile/user.component';

@Component({
  selector: 'app-admin-sidebar',
 // Only include this if you're using standalone components
  imports: [RouterModule, AdminDashboardComponent, ViewBookComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {

//  toggleSidebar() {
//   const sidebar = document.querySelector('.sidebar');
//   if (sidebar) {
//     sidebar.classList.toggle('show');
//   }
// }

isSidebarVisible: boolean = false;

toggleSidebar() {
  this.isSidebarVisible = !this.isSidebarVisible;
}
}
