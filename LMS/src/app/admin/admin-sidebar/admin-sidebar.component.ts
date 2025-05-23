import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../../manager/dashboard/dashboard.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { UserComponent } from '../../userProfile/user.component';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterModule,AdminDashboardComponent,UserComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

}
