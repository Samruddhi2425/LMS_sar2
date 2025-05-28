import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewBookComponent } from '../mView-book/view-book.component';
import { MAddBookComponent } from '../m-add-book/m-add-book.component';

@Component({
  selector: 'app-managersidebar',
  imports: [RouterModule, ViewBookComponent, MAddBookComponent],
  templateUrl: './managersidebar.component.html',
  styleUrl: './managersidebar.component.css'
})
export class ManagersidebarComponent {

  isSidebarVisible: boolean = false;

toggleSidebar() {
  this.isSidebarVisible = !this.isSidebarVisible;
}







}
