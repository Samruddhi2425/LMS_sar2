import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { UserComponent } from '../../userProfile/user.component';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterModule,AdminDashboardComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

}
