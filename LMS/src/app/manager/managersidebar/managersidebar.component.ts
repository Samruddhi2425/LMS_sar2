import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAddBookComponent } from '../m-add-book/m-add-book.component';
import { MViewBookComponent } from '../m-view-book/m-view-book.component';
import { MViewUserComponent } from '../m-view-user/m-view-user.component';

@Component({
  selector: 'app-managersidebar',
  imports: [RouterModule, MViewBookComponent, MAddBookComponent,MViewUserComponent],
  templateUrl: './managersidebar.component.html',
  styleUrl: './managersidebar.component.css'
})
export class ManagersidebarComponent {

  isSidebarVisible: boolean = false;

toggleSidebar() {
  this.isSidebarVisible = !this.isSidebarVisible;
}







}
