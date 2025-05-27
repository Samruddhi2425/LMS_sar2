import { Component } from '@angular/core';

@Component({
  selector: 'app-managersidebar',
  imports: [],
  templateUrl: './managersidebar.component.html',
  styleUrl: './managersidebar.component.css'
})
export class ManagersidebarComponent {

  isSidebarVisible: boolean = false;

toggleSidebar() {
  this.isSidebarVisible = !this.isSidebarVisible;
}
}
