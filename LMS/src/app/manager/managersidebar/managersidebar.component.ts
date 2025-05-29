import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-managersidebar',
  imports: [RouterModule, FormsModule],
  templateUrl: './managersidebar.component.html',
  styleUrl: './managersidebar.component.css'
})
export class ManagersidebarComponent {

  constructor(private router: Router){}
  isSidebarVisible: boolean = false;
  

toggleSidebar() {
  this.isSidebarVisible = !this.isSidebarVisible;
}

  logout(): void {
  localStorage.removeItem('userType');
  this.router.navigate(['/login']);
}

}
