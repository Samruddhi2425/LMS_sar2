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
  this.router.navigate(['/login']);
}

}
