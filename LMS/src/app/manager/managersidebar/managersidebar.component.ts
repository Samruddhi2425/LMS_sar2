import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewBookComponent } from '../view-book/view-book.component';

@Component({
  selector: 'app-managersidebar',
  imports: [RouterModule, ViewBookComponent],
  templateUrl: './managersidebar.component.html',
  styleUrl: './managersidebar.component.css'
})
export class ManagersidebarComponent {

  isSidebarVisible: boolean = false;

toggleSidebar() {
  this.isSidebarVisible = !this.isSidebarVisible;
}







}
