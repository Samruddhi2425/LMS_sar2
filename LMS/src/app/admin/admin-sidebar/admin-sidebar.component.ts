import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

import { ViewBookComponent } from '../view-book/view-book.component';
import { UserComponent } from '../../user/user/user.component';
import { IssuebookReportComponent } from '../issuebook-report/issuebook-report.component';



@Component({
  selector: 'app-admin-sidebar',
 // Only include this if you're using standalone components
  imports: [RouterModule, AdminDashboardComponent,UserComponent,ViewBookComponent,IssuebookReportComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {

  constructor(private router: Router){}

myFunction(): void {
  const x = document.getElementById("myTopnav");

  if (x) {
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}


 logout(): void {
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
